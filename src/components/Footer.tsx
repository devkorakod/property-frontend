export function Footer({ settings }: { settings?: any }) {
  const cc = settings?.contactChannels ?? {};
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="max-w-container mx-auto px-5 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="font-display text-lg tracking-[.28em]">
            D1<span className="text-red">·</span>LANDANDHOUSE
          </div>
          <p className="text-muted text-sm mt-4 max-w-[34ch]">
            ที่ปรึกษาอสังหาริมทรัพย์ ให้บริการซื้อ ขาย เช่า และการลงทุนทั่วประเทศไทย
          </p>
        </div>
        <div>
          <h4 className="eyebrow mb-3">ทรัพย์สิน</h4>
          <ul className="text-sm text-muted space-y-1.5">
            <li>บ้านเดี่ยว</li><li>คอนโดมิเนียม</li><li>ที่ดิน</li><li>อาคารพาณิชย์</li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-3">บริการ</h4>
          <ul className="text-sm text-muted space-y-1.5">
            <li>ฝากขาย–ฝากเช่า</li><li>ที่ปรึกษาการลงทุน</li><li>บริการลูกค้าต่างชาติ</li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow mb-3">ติดต่อ</h4>
          <ul className="text-sm text-muted space-y-1.5">
            {cc.phone && <li>{cc.phone}</li>}
            {cc.lineId && <li>LINE {cc.lineId}</li>}
            {cc.email && <li>{cc.email}</li>}
          </ul>
        </div>
      </div>
      <div className="max-w-container mx-auto px-5 pb-8 text-xs text-muted flex gap-6 flex-wrap">
        <span>© {new Date().getFullYear()} D1 Land and House Co., Ltd.</span>
        <span>นโยบายความเป็นส่วนตัว</span>
        <span>ข้อกำหนดการใช้งาน</span>
      </div>
    </footer>
  );
}
