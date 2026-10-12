import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Animated, Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';

import { EMAIL_REGEX } from '@/constants';
import { EyeIcon, EyeSlash, LockIcon, MidnightLogo } from '@/svg-icons';
import { tailwind, useIsRetro } from '@/theme';
import i18n from '@/i18n';
import { resetAuth } from '@/store/auth/authSlice';
import { authActions } from '@/store/auth/authActions';
import { useAppDispatch, useAppSelector } from '@/hooks';

import {
  BottomSheetBackdrop,
  BottomSheetHeader,
  LanguageList,
  Button,
  Icon,
  AuthButton,
} from '@/components-next';
import {
  selectInstallationUrl,
  selectBaseUrl,
  selectLocale,
} from '@/store/settings/settingsSelectors';
import { selectIsLoggingIn } from '@/store/auth/authSelectors';
import { setLocale } from '@/store/settings/settingsSlice';
import { useRefsContext } from '@/context/RefsContext';
import { SsoUtils } from '@/utils/ssoUtils';
import { RetroMeter, sheetChrome } from '@/components-next/retro';
import { AuthField, AuthLink, AuthScreenFrame } from './components';

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { languagesModalSheetRef } = useRefsContext();

  const animationConfigs = useBottomSheetSpringConfigs({
    mass: 1,
    stiffness: 420,
    damping: 30,
  });

  const isRetro = useIsRetro();
  const dispatch = useAppDispatch();
  const isLoggingIn = useAppSelector(selectIsLoggingIn);

  const installationUrl = useAppSelector(selectInstallationUrl);
  const baseUrl = useAppSelector(selectBaseUrl);
  const activeLocale = useAppSelector(selectLocale);

  useEffect(() => {
    languagesModalSheetRef.current?.dismiss({
      overshootClamping: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLocale]);

  useEffect(() => {
    dispatch(resetAuth());
    if (!installationUrl) {
      navigation.navigate('ConfigureURL' as never);
    }
  }, [installationUrl, navigation, dispatch]);

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;
    // Clear any existing auth state before login
    dispatch(resetAuth());

    try {
      const result = await dispatch(authActions.login({ email, password })).unwrap();

      // Check if MFA is required in the response
      if ('mfa_required' in result && result.mfa_required) {
        // Navigate directly to MFA screen with the token
        navigation.navigate('MFAScreen' as never);
      }
      // If MFA not required, the auth state will be updated and
      // the app will automatically navigate to the dashboard
    } catch {
      // Login error is handled by Redux and displayed in the UI
    }
  };

  // TODO: Change this condition based on EE check
  // Show SSO login button only if installation URL contains app.chatwoot.com
  const showSsoLogin = installationUrl.includes('app.chatwoot.com');

  const openResetPassword = () => {
    navigation.navigate('ResetPassword' as never);
  };

  const openConfigInstallationURL = () => {
    navigation.navigate('ConfigureURL' as never);
  };

  const onChangeLanguage = (locale: string) => {
    dispatch(setLocale(locale));
  };

  const handleSsoLogin = async () => {
    if (!installationUrl) {
      return;
    }

    try {
      const result = await SsoUtils.loginWithSSO(installationUrl);

      if (result.type === 'success' && result.url) {
        const ssoParams = SsoUtils.parseCallbackUrl(result.url);
        await SsoUtils.handleSsoCallback(ssoParams, dispatch);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // SSO login error handled silently
    }
  };

  return (
    <>
      <AuthScreenFrame
        edges={['top']}
        contentClasses="px-6 pt-24"
        icon={
          <View style={tailwind.style('w-10 h-10')}>
            <MidnightLogo
              body={tailwind.color('gray-950') ?? ''}
              eyes={tailwind.color('white') ?? ''}
            />
          </View>
        }
        title={i18n.t('LOGIN.TITLE')}
        description={isRetro ? undefined : i18n.t('LOGIN.DESCRIPTION', { baseUrl })}
        windowTitle={`login — ${baseUrl}`}
        status={i18n.t('LOGIN.DESCRIPTION', { baseUrl })}
        footer={
          <>
            <AuthLink
              text={i18n.t('LOGIN.CHANGE_URL')}
              onPress={openConfigInstallationURL}
              pressableClasses="flex-row justify-center items-center mt-6"
            />
            <AuthLink
              text={i18n.t('LOGIN.CHANGE_LANGUAGE')}
              onPress={() => languagesModalSheetRef.current?.present()}
            />
          </>
        }>
        {showSsoLogin && (
          <View>
            <AuthButton
              text={i18n.t('LOGIN.LOGIN_VIA_SSO')}
              icon={<LockIcon />}
              handlePress={handleSsoLogin}
              disabled={isLoggingIn}
              variant="outline"
              style={tailwind.style('mt-8')}
            />

            <View style={tailwind.style('flex-row items-center my-6')}>
              <View style={tailwind.style('flex-1 h-px bg-gray-300')} />
              <Animated.Text style={tailwind.style('px-4 text-sm text-gray-600')}>OR</Animated.Text>
              <View style={tailwind.style('flex-1 h-px bg-gray-300')} />
            </View>
          </View>
        )}

        <Controller
          control={control}
          rules={{
            required: i18n.t('LOGIN.EMAIL_REQUIRED'),
            pattern: {
              value: EMAIL_REGEX,
              message: i18n.t('LOGIN.EMAIL_ERROR'),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AuthField
              containerClasses="pt-2 gap-2"
              label={i18n.t('LOGIN.EMAIL')}
              error={errors.email?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: i18n.t('LOGIN.PASSWORD_REQUIRED'),
            minLength: {
              value: 6,
              message: i18n.t('LOGIN.PASSWORD_ERROR'),
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <AuthField
              containerClasses="pt-8 gap-2"
              label={i18n.t('LOGIN.PASSWORD')}
              error={errors.password?.message}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor={tailwind.color('text-gray-500')}
              secureTextEntry={!showPassword}
              right={
                <Pressable onPress={() => setShowPassword(!showPassword)} hitSlop={8}>
                  <Icon size={20} icon={showPassword ? <EyeIcon /> : <EyeSlash />} />
                </Pressable>
              }
            />
          )}
          name="password"
        />

        <View style={tailwind.style(isRetro ? 'items-end mb-5' : '')}>
          <AuthLink
            inWindow
            text={i18n.t('LOGIN.FORGOT_PASSWORD')}
            onPress={openResetPassword}
            pressableClasses="pt-1 mb-8"
            textClasses="text-blue-800 font-inter-medium-24 text-right"
          />
        </View>

        <Button
          text={isLoggingIn ? i18n.t('LOGIN.LOGIN_LOADING') : i18n.t('LOGIN.LOGIN')}
          handlePress={handleSubmit(onSubmit)}
        />
        {isRetro && isLoggingIn ? <RetroMeter style={tailwind.style('mt-3')} /> : null}
      </AuthScreenFrame>
      <BottomSheetModal
        {...sheetChrome()}
        ref={languagesModalSheetRef}
        backdropComponent={BottomSheetBackdrop}
        detached
        enablePanDownToClose
        animationConfigs={animationConfigs}
        snapPoints={['70%']}>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <BottomSheetHeader headerText={i18n.t('SETTINGS.SET_LANGUAGE')} />
          <LanguageList onChangeLanguage={onChangeLanguage} currentLanguage={activeLocale} />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

export default LoginScreen;
