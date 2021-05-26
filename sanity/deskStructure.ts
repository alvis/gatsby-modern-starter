import S from '@sanity/desk-tool/structure-builder';

export default () =>
  S.list()
    .title('Base')
    .items([
      S.listItem()
        .title('Settings')
        .child(S.document().schemaType('landing').documentId('main')),
      ...S.documentTypeListItems(),
    ]);
