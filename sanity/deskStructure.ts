import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Base')
    .items([
      // adding a panel for controlling the content shown on the landing page
      // see https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
      S.listItem()
        .title('Settings')
        .child(S.document().schemaType('landing').documentId('main')),
      ...S.documentTypeListItems().filter(
        (listItem) => !['landing'].includes(listItem.getId()),
      ),
    ]);
