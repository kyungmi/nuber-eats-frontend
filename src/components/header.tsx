import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import nuberLogo from '../images/logo.svg';

export const Header: FC = () => {
  const { data } = useMe();
  return (
    <header className="py-4">
      <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
        <span className="text-lg">
          <Link to="/my-profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </span>
      </div>
    </header>
  );
};