import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Icon } from '@/components-next';
import { URL_WITHOUT_HTTP_REGEX } from '@/constants';
import { DEFAULT_INSTALLATION_HOST } from '@/constants/url';
import { LinkIcon } from '@/svg-icons';
import i18n from '@/i18n';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectBaseUrl } from '@/store/settings/settingsSelectors';
import { resetSettings } from '@/store/settings/settingsSlice';
import { settingsActions } from '@/store/settings/settingsActions';
import { AuthField, AuthScreenFrame } from './components';

type FormData = {
  url: string;
};

const ConfigURLScreen = () => {
  const baseUrl = useAppSelector(selectBaseUrl);

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      url: baseUrl || DEFAULT_INSTALLATION_HOST,
    },
  });

  useEffect(() => {
    dispatch(resetSettings());
  }, [dispatch]);

  const onSubmit = async (data: FormData) => {
    const { url } = data;
    if (url) {
      dispatch(settingsActions.setInstallationUrl(url));
    }
  };

  return (
    <AuthScreenFrame
      contentClasses="px-6 pt-16"
      icon={<Icon icon={<LinkIcon />} size={40} />}
      title={i18n.t('CONFIGURE_URL.ENTER_URL')}
      description={i18n.t('CONFIGURE_URL.DESCRIPTION')}
      windowTitle="server.cfg"
      status={DEFAULT_INSTALLATION_HOST}>
      <Controller
        control={control}
        rules={{
          required: i18n.t('CONFIGURE_URL.URL_REQUIRED'),
          pattern: {
            value: URL_WITHOUT_HTTP_REGEX,
            message: i18n.t('CONFIGURE_URL.URL_ERROR'),
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthField
            error={errors.url?.message}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
        name="url"
      />

      <Button text={i18n.t('CONFIGURE_URL.CONNECT')} handlePress={handleSubmit(onSubmit)} />
    </AuthScreenFrame>
  );
};

export default ConfigURLScreen;
