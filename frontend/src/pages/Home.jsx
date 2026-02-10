import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20 px-4">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        {t('home.title')}
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 opacity-90">
                        {t('home.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-secondary text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-colors shadow-lg">
                            Get Started
                        </button>
                        <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-primary transition-all shadow-md">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t('roles.student')} Dashboard</h3>
                            <p className="text-gray-600">Upload and manage study materials efficiently in multiple languages.</p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t('roles.community')}</h3>
                            <p className="text-gray-600">A digital platform for faculty communities to share activities and updates.</p>
                        </div>
                        <div className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t('roles.council')} Activities</h3>
                            <p className="text-gray-600">Simplified management for Sports Council and other student organizations.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
