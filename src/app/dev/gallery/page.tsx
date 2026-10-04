"use client";

import { useState } from "react";

import {
  ActionTile,
  Banner,
  Blank,
  Button,
  ButtonLink,
  CheckRow,
  Chip,
  DateBlock,
  Disclosure,
  EmptyState,
  Entry,
  ErrorState,
  EvidenceQuote,
  IconButton,
  InlineLink,
  KeyValue,
  MoneyField,
  Note,
  OptionRow,
  Panel,
  ProgressRuler,
  QuickTile,
  Ruler,
  SectionLabel,
  Segmented,
  Stamp,
  Switch,
  Tag,
  TextArea,
  TextField,
} from "@/components/ui";
import { Sheet } from "@/components/ui/overlay";
import { Composer } from "@/components/ui/composer";
import { useSettings } from "@/components/use-settings";
import * as icons from "@/components/icons";
import { BookIcon, LedgerIcon, WarningIcon } from "@/components/icons";

const VERDICTS = ["HIGH", "MULTIPLE", "SOME", "NONE", "NOT_ENOUGH"] as const;

export default function Gallery() {
  const { t } = useSettings();
  const [money, setMoney] = useState("");
  const [open, setOpen] = useState(false);
  const [on, setOn] = useState(true);
  const [seg, setSeg] = useState("a");
  const [pick, setPick] = useState("x");
  const [checked, setChecked] = useState(false);

  const list = Object.entries(icons).filter(([n]) => n.endsWith("Icon"));

  return (
    <>
      <h1>Gallery</h1>
      <p className="t-lead ink-2 mt-8">development only</p>

      <SectionLabel>Stamps</SectionLabel>
      <div className="stack-16">
        {VERDICTS.map((v) => (
          <Stamp key={v} verdict={v} word={v} sub={v.toLowerCase()} />
        ))}
      </div>

      <SectionLabel>Rulers</SectionLabel>
      <div className="stack-16">
        <Ruler level={2} labels={["one", "two", "three", "four"]} caption="scale" />
        <ProgressRuler value={2} max={6} label="step 2 of 6" />
        <ProgressRuler value={45} max={60} label="45 of 60" tall />
      </div>

      <SectionLabel>Buttons</SectionLabel>
      <div className="stack-12">
        <Button full>Primary</Button>
        <Button variant="secondary" full>
          Secondary
        </Button>
        <Button variant="emergency" full>
          1930
        </Button>
        <Button variant="text">Text</Button>
        <Button full disabled>
          Disabled
        </Button>
        <ButtonLink href="/dev/gallery" variant="secondary" full>
          Link button
        </ButtonLink>
        <div className="run-row">
          <IconButton label="back" round>
            <BookIcon />
          </IconButton>
          <InlineLink href="/dev/gallery">Inline link</InlineLink>
        </div>
      </div>

      <SectionLabel>Tiles</SectionLabel>
      <div className="stack-12">
        <ActionTile href="/dev/gallery" title="Neutral" desc="one line" icon={<LedgerIcon />} />
        <ActionTile
          href="/dev/gallery"
          title="Danger"
          desc="one line"
          icon={<WarningIcon />}
          tone="danger"
          tag="new"
        />
        <ActionTile
          href="/dev/gallery"
          title="Caution"
          desc="one line"
          icon={<WarningIcon />}
          tone="caution"
        />
        <QuickTile href="/dev/gallery" label="Quick" icon={<BookIcon />} />
        <Entry n={1} title="Entry row">
          <p className="t-caption ink-2">child content</p>
        </Entry>
      </div>

      <SectionLabel>Surfaces</SectionLabel>
      <div className="stack-16">
        <Panel>Panel</Panel>
        <Panel sunken>Panel sunken</Panel>
        <Note title="Note">body</Note>
        <Banner icon={<WarningIcon />}>Banner</Banner>
        <EvidenceQuote>Quoted evidence</EvidenceQuote>
        <EvidenceQuote tone="caution">Quoted evidence, caution</EvidenceQuote>
        <Disclosure label="Disclosure">
          <p>hidden body</p>
        </Disclosure>
        <div className="run-row">
          <Tag>neutral</Tag>
          <Tag tone="danger">danger</Tag>
          <Tag tone="caution">caution</Tag>
          <Tag tone="ok">ok</Tag>
          <Tag tone="action">action</Tag>
        </div>
        <DateBlock day="04" month="Oct" />
      </div>

      <SectionLabel>States</SectionLabel>
      <div className="stack-16">
        <EmptyState word="NONE" line="nothing here yet" action={<Button>Do it</Button>} />
        <ErrorState what="Something broke" safe="Your data is safe." action={<Button>Retry</Button>} />
      </div>

      <SectionLabel>Fields</SectionLabel>
      <div className="stack-16">
        <TextField id="g-text" label="Text field" placeholder="type" />
        <TextField id="g-err" label="With error" error="Not valid" />
        <TextArea id="g-area" label="Text area" rows={3} />
        <MoneyField id="g-money" label="Money" value={money} onValueChange={setMoney} />
        <p>
          A sentence with a <Blank value="" onValueChange={() => {}} label="blank" /> in it.
        </p>
        <Segmented
          label="Segmented"
          value={seg}
          onChange={setSeg}
          options={[
            { value: "a", label: "One" },
            { value: "b", label: "Two" },
            { value: "c", label: "Three" },
          ]}
        />
        <div className="run-row">
          <Chip label="Chip off" selected={false} onSelect={() => {}} />
          <Chip label="Chip on" selected onSelect={() => {}} />
        </div>
        <div>
          <OptionRow
            label="Option one"
            selected={pick === "x"}
            onSelect={() => setPick("x")}
          />
          <OptionRow
            label="Option two"
            selected={pick === "y"}
            onSelect={() => setPick("y")}
          />
        </div>
        <CheckRow label="Check row" checked={checked} onToggle={() => setChecked(!checked)} />
        <div className="setting-list">
          <Switch
            label="Switch"
            checked={on}
            onToggle={() => setOn(!on)}
            onWord="on"
            offWord="off"
          />
        </div>
      </div>

      <SectionLabel>Composer and sheet</SectionLabel>
      <Composer />
      <div className="mt-16">
        <Button onClick={() => setOpen(true)}>Open sheet</Button>
      </div>
      <Sheet open={open} onClose={() => setOpen(false)} title="नमूना" closeLabel={t("common.close")}>
        <p>एक पंक्ति।</p>
        <div className="mt-16">
          <Button full onClick={() => setOpen(false)}>
            {t("common.close")}
          </Button>
        </div>
      </Sheet>

      <SectionLabel>Table</SectionLabel>
      <KeyValue
        head={["Key", "Value"]}
        rows={[
          { k: "one", v: "first" },
          { k: "two", v: "second" },
        ]}
      />

      <SectionLabel>Icons</SectionLabel>
      <ul className="icon-grid">
        {list.map(([name, Icon]) => {
          const C = Icon as (p: { width: number; height: number }) => React.ReactElement;
          return (
            <li key={name}>
              <C width={24} height={24} />
              <span className="t-caption ink-2">{name.replace("Icon", "")}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
