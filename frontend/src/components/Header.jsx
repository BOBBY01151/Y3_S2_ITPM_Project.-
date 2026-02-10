import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
    const { t } = useTranslation();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-primary">
                            CampusConnect
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 font-medium">
                            {t('common.home')}
                        </Link>
                        <Link to="/login" className="text-gray-700 hover:text-primary px-3 py-2 font-medium">
                            {t('common.login')}
                        </Link>
                        <Link to="/register" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors font-medium">
                            {t('common.register')}
                        </Link>
                        <LanguageSwitcher />
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
