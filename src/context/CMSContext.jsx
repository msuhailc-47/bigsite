
import React, { createContext, useContext } from 'react';
import { ContentProvider, useContent } from './ContentContext';
import { ThemeProvider, useTheme } from './ThemeContext';
import { NavigationProvider, useNavigation } from './NavigationContext';
import { DataProvider, useData } from './DataContext';
import { SettingsProvider, useSettings } from './SettingsContext';
import translations from '../i18n/translations';

const CMSContext = createContext(null);

function CMSCombinedProvider({ children }) {
  const content = useContent();
  const theme = useTheme();
  const nav = useNavigation();
  const data = useData();
  const settings = useSettings();

  const resetAll = () => {
    if (window.confirm("Are you sure you want to reset all CMS changes to code defaults?")) {
      content.updateTranslations(translations);
      // Let's clear localStorage to perform a hard reset on reload
      localStorage.removeItem('dorek_cms_translations');
      localStorage.removeItem('dorek_cms_theme_settings');
      localStorage.removeItem('dorek_cms_navigation');
      localStorage.removeItem('dorek_cms_code_settings');
      localStorage.removeItem('dorek_cms_media');
      window.location.reload(); 
    }
  };

  const importCMSData = (jsonData) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.translationsData) content.updateTranslations(parsed.translationsData);
      if (parsed.navigation) nav.setNavigation(parsed.navigation);
      if (parsed.themeSettings) theme.updateTheme(parsed.themeSettings);
      return true;
    } catch (e) {
      alert("Invalid JSON format!");
      return false;
    }
  };

  const exportCMSData = () => {
    const exportData = {
      translationsData: content.translationsData,
      navigation: nav.navigation,
      mediaLibrary: data.mediaLibrary,
      codeSettings: settings.codeSettings,
      themeSettings: theme.themeSettings
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dorek_cms_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const combinedValue = {
    ...content,
    ...theme,
    ...nav,
    ...data,
    ...settings,
    resetAll,
    importCMSData,
    exportCMSData,
    isSyncing: content.isSyncing // Expose the syncing state
  };

  return <CMSContext.Provider value={combinedValue}>{children}</CMSContext.Provider>;
}

export function CMSProvider({ children }) {
  return (
    <ContentProvider>
      <ThemeProvider>
        <NavigationProvider>
          <DataProvider>
            <SettingsProvider>
              <CMSCombinedProvider>
                {children}
              </CMSCombinedProvider>
            </SettingsProvider>
          </DataProvider>
        </NavigationProvider>
      </ThemeProvider>
    </ContentProvider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within a CMSProvider');
  return context;
}
