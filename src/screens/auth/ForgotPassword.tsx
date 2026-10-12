import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Icon } from '@/components-next';
import { EMAIL_REGEX } from '@/constants';
import { KeyRoundIcon } from '@/svg-icons';
import { authActions } from '@/store/auth/authActions';
import { useAppDispatch } from '@/hooks';
import { resetAuth } from '@/store/auth/authSlice';
import AnalyticsHelper from '@/utils/analyticsUtils';
import { ACCOUNT_EVENTS } from '@/constants/analyticsEvents';
import i18n from '@/i18n';
import { AuthField, AuthScreenFrame } from './components';

type FormData = {
  email: string;
  password: string;
};

const ForgotPassword = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const { email } = data;
    dispatch(authActions.resetPassword({ email }));
    AnalyticsHelper.track(ACCOUNT_EVENTS.FORGOT_PASSWORD);
  };

  return (
    <AuthScreenFrame
      contentClasses="px-6 pt-16"
      icon={<Icon icon={<KeyRoundIcon />} size={40} />}
      title={i18n.t('FORGOT_PASSWORD.TITLE')}
      description={i18n.t('FORGOT_PASSWORD.SUB_TITLE')}
      windowTitle="reset.pw">
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

      <Button text={i18n.t('FORGOT_PASSWORD.RESET_HERE')} handlePress={handleSubmit(onSubmit)} />
    </AuthScreenFrame>
  );
};

export default ForgotPassword;
