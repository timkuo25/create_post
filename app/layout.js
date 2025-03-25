import { PostsProvider } from "./context/PostsContext"

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <PostsProvider>
            {children}
          </PostsProvider>
        </body>
      </html>
    )
}