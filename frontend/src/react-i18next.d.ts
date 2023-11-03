import { resources } from './react-i18next';

declare module 'react-i18next' {
    interface CustomTypeOptions {
        resources: (typeof resources)['ru'];
    }
}

