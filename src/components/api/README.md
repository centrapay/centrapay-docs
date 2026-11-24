# API reference components

Components for the API reference pages. They're plain Astro and Tailwind:
tabs are driven by hidden radio inputs, and nested fields by native
`<details>` elements. The only JavaScript is in `AnchorLink`, which copies a
link without scrolling the page; without it the link icons are plain links.

These components know nothing about OpenAPI. Spec-driven pages
(`src/pages/api/[openapiPage].astro`) compose them through `OpenApiEndpoint`,
which renders each row of the spec with `OpenApiField`. Markdoc pages use them
through the `{% properties %}`, `{% property %}`, `{% error %}` and
`{% endpoint %}` tags.

## Page structure

```
ApiPage                      h1 title and intro
└─ ApiSection                one model, endpoint or prose section; copy left, code right
   ├─ AnchorHeading (h2)     section title, plus StatusTag for experimental/deprecated
   ├─ EndpointPath           MethodBadge + path, for endpoints
   ├─ Markdown               description from the spec
   ├─ Subsection (h3)        "Path parameters", "Query parameters", "Request body", "Responses"
   │  ├─ FieldList
   │  │  └─ FieldItem        name, "optional array of objects", description
   │  │     └─ slot="fields" behind a caret: a nested FieldList, a ValueList...
   │  └─ ResponseTabs        Tabs + TabPanel per status code: the response's fields, or errors
   └─ slot="code"
      └─ CodeSample          request and response examples
```

## Components

| Component | Use it for |
| --- | --- |
| `ApiPage` | The page frame: the only `h1`, an `intro` slot and the sections. |
| `ApiSection` | One section. Default slot is the copy column; the `code` slot is the sticky code column. Columns stack below `xl`. |
| `AnchorHeading` | Any heading that should be linkable. Set `level` to keep the outline correct. |
| `Subsection` | A titled part of a section, one heading level below it. |
| `FieldList` / `FieldItem` | Parameters, body fields and attributes. Put nested content in the `fields` slot to give the field a caret. |
| `ValueList` | A field's possible values, in a `FieldItem`'s `fields` slot. |
| `ErrorItem` | An error message and its description, inside a `FieldList`. |
| `Tabs` / `TabPanel` | CSS-only tabs. Give `Tabs` the labels and add one `TabPanel` per tab, in order. |
| `ResponseTabs` | An endpoint's responses, one tab per status code. The default slot fills the success tab. |
| `MethodBadge` / `EndpointPath` | Colour-coded HTTP methods. Colours live in `methods.js`, shared with the sidebar. |
| `StatusTag` | `experimental` or `deprecated`. |
| `CodeSample` | A titled Expressive Code block. |
| `Markdown` | Markdown segments from `createMarkdownRenderer`, styled as prose. |

## Conventions

- **Anchors.** Every heading and field has a unique id, scoped by its
  section: `create-an-account`, `create-an-account.body`,
  `create-an-account.body.name`, `get-an-account.responses.body.subscriptions.name`,
  and a possible value under its field: `get-a-payment-request.responses.body.status.paid`.
  Only success response fields are anchored: error tabs can't be opened by a link.
  `getPageSections` in `utils/openApiPage.js` assigns them (`fieldAnchor` on
  each row), and the search index (`src/plugins/flexsearch.js`) links to the
  same ones. Models have no anchors of their own: link to the route or field
  that shows them. Links to anything inside a closed `<details>` open it.
- **Gutter icons.** Carets and anchor icons sit in the gutter to the left of a
  name (absolutely positioned), never inline, so items with and without them
  stay aligned. `ApiPage` and nested `FieldList`s leave room for them.
- **Hover anchors.** Put `group/anchor` on the element whose hover should
  reveal an `AnchorLink`. Keep that element apart from any nested items, so
  hovering a child doesn't light up its parent's icon too.
- **Accessibility.**
  - An `AnchorLink` sits after the heading or field name in the source, not
    inside it, so screen readers don't read "Copy link to…" as part of the
    heading. Its label says it copies, since that's what clicking does.
  - Gutter icons are 24px targets.
  - Label each `TabPanel` (eg `label="404 response"`), so it's announced as
    a named group.
  - Transitions stop under `prefers-reduced-motion`.
  - Code blocks take keyboard focus (`ec.config.mjs`), because they scroll
    inside their own box.
- **Type copy.** Field types are short, muted text: `required string`,
  `optional array of objects`, `timestamp`. Request fields show
  required/optional; model and response attributes don't.
- **Repeated styles** that every field carries (description text, the anchor
  icon) are named Tailwind utilities in `src/styles/api.css`, such as
  `api-rich-text`, rather than long class lists repeated thousands of times
  per page.
- **Tailwind class names** must appear in full in the source. That's why
  `tabs.js` lists one selector per tab position, and `methods.js` spells out
  each method's colours.
