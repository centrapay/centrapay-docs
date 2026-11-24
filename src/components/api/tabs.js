
// Tailwind only generates classes it can find written out, so each panel
// position's selector is listed in full. Section-scoped panels rely on an
// ApiSection holding at most one Tabs.
const SHOW_IN_TABS = [
  'group-has-[[data-tab]:nth-child(1)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(2)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(3)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(4)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(5)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(6)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(7)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(8)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(9)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(10)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(11)>input:checked]/tabs:block',
  'group-has-[[data-tab]:nth-child(12)>input:checked]/tabs:block',
];

const SHOW_IN_SECTION = [
  'group-has-[[data-tab]:nth-child(1)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(2)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(3)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(4)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(5)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(6)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(7)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(8)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(9)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(10)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(11)>input:checked]/section:flex',
  'group-has-[[data-tab]:nth-child(12)>input:checked]/section:flex',
];

export const SHOW_PANEL = { tabs: SHOW_IN_TABS, section: SHOW_IN_SECTION };

export const MAX_TABS = SHOW_IN_TABS.length;
