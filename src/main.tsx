import React from 'react'
import ReactDOM from 'react-dom/client'
import { EntrypointPage } from '@components/pages'
import { CssBaseline, ThemeProvider } from '@mui/material'
import DEFAULT_THEME from '@components/theme'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CssBaseline />
        <ThemeProvider theme={DEFAULT_THEME}>
            <EntrypointPage />
        </ThemeProvider>
    </React.StrictMode>
)
