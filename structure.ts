import Iframe from 'sanity-plugin-iframe-pane'
import type { DefaultDocumentNodeResolver } from 'sanity/desk'

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Conditionally return a different configuration based on the schema type
  if (schemaType === 'post') {
    return S.document().views([
      S.view.form(),
      // @ts-ignore
      S.view.component(Iframe).options({
        url: `${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/api/preview`,
        defaultSize: 'desktop',
        reload: {
          button: true,
        },
        attributes: {},
      }).title('Preview')
    ])
  }
  return S.document()
}