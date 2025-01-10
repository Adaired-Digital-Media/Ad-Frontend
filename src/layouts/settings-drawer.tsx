'use client';

import { Button } from 'rizzui';
import SimpleBar from '@core/ui/simplebar';
import EnvatoIcon from '@core/components/icons/envato';
// import LayoutSwitcher from '@/layouts/layout-switcher';
// import ColorOptions from '@/layouts/settings/color-options';
// import AppDirection from '@/layouts/settings/app-direction';
// import ThemeSwitcher from '@/layouts/settings/theme-switcher';

export default function SettingsDrawer() {
  return (
    <>
      <SimpleBar className="h-[calc(100%-138px)]">
        <div className="px-5 py-6">
          {/* <ThemeSwitcher /> */}
          {/* <AppDirection /> */}
          {/* <LayoutSwitcher /> */}
          {/* <ColorOptions /> */}
        </div>
      </SimpleBar>

      <SettingsFooterButton />
    </>
  );
}

function SettingsFooterButton() {
  return (
    <div className="grid grid-cols-1 border-t border-muted px-6 pt-4">
      <Button size="lg" as="span" className={'text-base font-semibold'}>
        <span className="">No Settings Available</span>
      </Button>
    </div>
  );
}
