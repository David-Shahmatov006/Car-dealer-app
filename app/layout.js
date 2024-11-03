import './globals.css';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
