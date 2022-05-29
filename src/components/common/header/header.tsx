import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '~/common/enums/enums';
import { BoardCreatingForm } from '~/components/main/components/board-creating-form';
import { useAppDispatch } from '~/hooks/hooks';
import { auth as authActions } from '~/store/actions';
import { FormattedMessage } from '../common';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import styles from './styles.module.scss';
import plusImg from '~/assets/images/plus-purple.svg';
import avatarImg from '~/assets/images/avatar.svg';
import arrowImg from '~/assets/images/menu-arrow.svg';
import editImg from '~/assets/images/edit.svg';
import exitImg from '~/assets/images/exit.svg';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = (): void => {
    dispatch(authActions.signOut());
  };

  const handleEditUser = (): void => {
    navigate(AppRoute.PROFILE);
  };

  const handleOpenCreateBoard = (): void => {
    setIsOpen(true);
  };

  const handleCloseCreateBoard = (): void => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles['header-container']}>
        <BoardCreatingForm isOpen={isOpen} onClose={handleCloseCreateBoard} />
        <div className={styles['header-left']} onClick={handleOpenCreateBoard}>
          <img className={styles['create-board-icon']} src={plusImg} alt="create board" />
          <FormattedMessage className={styles['create-board-span']} as="span" message="header.nav.createBoard" />
        </div>
        <div className={styles['header-right']}>
          <LanguageSwitcher />
          <div className={styles['user']}>
            <div className={styles['user-container']}>
              <span className={styles['user-name']} >Anima Agrawal</span>
              <img className={styles['avatar-img']} src={avatarImg} alt="avatar" />
              <img className={styles['arrow-img']} src={arrowImg} alt="menu arrow" />
            </div>
            <div className={styles['user-menu']}>
              <div className={styles['edit-user']} onClick={handleEditUser}>
                <FormattedMessage className={styles['user-menu-span']} as="span" message="header.nav.editUser" />
                <img className={styles['edit-img']} src={editImg} alt="edit profile" />
              </div>
              <div className={styles['log-out']} onClick={handleSignOut}>
                <FormattedMessage className={styles['user-menu-span']} as="span" message="header.nav.signOut" />
                <img className={styles['log-out-img']} src={exitImg} alt="log out" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
