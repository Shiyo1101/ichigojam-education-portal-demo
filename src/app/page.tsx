import { Widget } from '@/components/common/widget';
import Footer from '@/components/Top/footer';
import Header from '@/components/Top/header';
import CalendarWidget from '@/components/Top/main/calendar-widget';
import { MemoWidget } from '@/components/Top/main/memo-widget';
import SlideWidget from '@/components/Top/main/slide-widget';
import VisualWidget from '@/components/Top/main/visual-widget';

export const runtime = 'edge';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container pt-4 pb-6 flex flex-col gap-y-4">
        <div className="flex justify-center p-2 lg:p-4 text-2xl lg:text-5xl">
          プログラミング支援
          <br className="lg:hidden" />
          {` `}講師向けポータルサイト
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          <CalendarWidget />
          <VisualWidget />
          <SlideWidget />
        </div>
        <MemoWidget />
        <Widget
          title="プログラミング支援実施内容報告（2025年度）"
          externalLink="https://github.com/Shiyo1101"
        >
          <iframe
            className="w-full h-52 lg:h-[550px]"
            src="https://github.com/Shiyo1101"
          ></iframe>
        </Widget>
      </main>
      <Footer />
    </>
  );
}
