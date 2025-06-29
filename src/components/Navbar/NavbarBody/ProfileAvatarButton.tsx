import { useState } from 'react';

import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useDispatch } from 'react-redux';

import styles from './ProfileAvatarButton.module.scss';

import Button, { ButtonShape, ButtonSize, ButtonVariant } from '@/dls/Button/Button';
import PopoverMenu from '@/dls/PopoverMenu/PopoverMenu';
import ClockIcon from '@/icons/clock.svg';
import ArrowIcon from '@/icons/east.svg';
import ReaderIcon from '@/icons/learning-plan.svg';
import LogoutIcon from '@/icons/logout.svg';
import NotesIcon from '@/icons/notes-filled.svg';
import NotificationBellIcon from '@/icons/notification-bell.svg';
import IconPerson from '@/icons/person.svg';
import { setIsSidebarNavigationVisible } from '@/redux/slices/QuranReader/sidebarNavigation';
import { logoutUser } from '@/utils/auth/api';
import { isLoggedIn } from '@/utils/auth/login';
import { removeLastSyncAt } from '@/utils/auth/userDataSync';
import { logButtonClick } from '@/utils/eventLogger';
import {
  getLoginNavigationUrl,
  getMyCoursesNavigationUrl,
  getNotesNavigationUrl,
  getNotificationSettingsNavigationUrl,
  getProfileNavigationUrl,
  getReadingGoalProgressNavigationUrl,
} from '@/utils/navigation';

const ProfileAvatarButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();
  const isUserLoggedIn = isLoggedIn();

  const onTriggerClicked = () => {
    dispatch({ type: setIsSidebarNavigationVisible.type, payload: false });
    if (!isUserLoggedIn) {
      logButtonClick('profile_avatar_login');
    }
  };

  const onLogoutClicked = async () => {
    logButtonClick('profile_avatar_logout');

    await logoutUser();
    removeLastSyncAt();
    router.reload();
  };

  const onProfileClicked = () => {
    logButtonClick('profile_avatar_profile');
    router.push(getProfileNavigationUrl()).then(() => {
      setIsOpen(false);
    });
  };

  const onNotificationSettingsClicked = () => {
    logButtonClick('profile_avatar_notification_settings');
    router.push(getNotificationSettingsNavigationUrl()).then(() => {
      setIsOpen(false);
    });
  };

  const onReadingHistoryClicked = () => {
    logButtonClick('profile_avatar_reading_history');
    router.push(getReadingGoalProgressNavigationUrl()).then(() => {
      setIsOpen(false);
    });
  };

  const onNotesClicked = () => {
    logButtonClick('profile_avatar_notes');
    router.push(getNotesNavigationUrl()).then(() => {
      setIsOpen(false);
    });
  };

  const onMyCoursesClicked = () => {
    logButtonClick('profile_avatar_my_courses');
    router.push(getMyCoursesNavigationUrl()).then(() => {
      setIsOpen(false);
    });
  };

  if (isUserLoggedIn) {
    return (
      <PopoverMenu
        isModal={false}
        trigger={
          <Button
            tooltip={t('profile')}
            ariaLabel={t('profile')}
            variant={ButtonVariant.Ghost}
            href={null}
            shape={ButtonShape.Circle}
            onClick={onTriggerClicked}
            shouldFlipOnRTL={false}
          >
            <IconPerson />
          </Button>
        }
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverMenu.Item onClick={onProfileClicked} icon={<ArrowIcon />}>
          {t('profile')}
        </PopoverMenu.Item>
        <PopoverMenu.Item onClick={onNotificationSettingsClicked} icon={<NotificationBellIcon />}>
          {t('notification-settings')}
        </PopoverMenu.Item>
        <PopoverMenu.Item onClick={onReadingHistoryClicked} icon={<ClockIcon />}>
          {t('reading-history')}
        </PopoverMenu.Item>
        <PopoverMenu.Item onClick={onNotesClicked} icon={<NotesIcon />}>
          {t('notes.title')}
        </PopoverMenu.Item>
        <PopoverMenu.Item onClick={onMyCoursesClicked} icon={<ReaderIcon />}>
          {t('my-learning-plans')}
        </PopoverMenu.Item>
        <PopoverMenu.Item onClick={onLogoutClicked} icon={<LogoutIcon />}>
          {t('logout')}
        </PopoverMenu.Item>
      </PopoverMenu>
    );
  }

  return (
    <Button
      tooltip={t('sign-in')}
      ariaLabel={t('sign-in')}
      variant={ButtonVariant.Simplified}
      size={ButtonSize.Small}
      href={getLoginNavigationUrl(router.asPath)}
      onClick={onTriggerClicked}
      id="login-button"
      className={styles.loginButton}
    >
      {t('sign-in')}
    </Button>
  );
};

export default ProfileAvatarButton;
