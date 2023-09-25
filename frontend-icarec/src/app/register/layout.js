export const metadata = {
    title: "Registro Ica Rec",
    description: "Registro Del Registro Meta Register",
    keywords: ['Register', 'Form', 'Ica Rec'],
  }
  
  export default function RootLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <section>
        {children}
      </section>
    )
  }
  