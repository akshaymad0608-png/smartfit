/**
 * Build and download a PDF health report. jsPDF is dynamically imported so it
 * never ships in the main bundle — only fetched when the user clicks download.
 */
export async function downloadReport(rows: { label: string; value: string }[]) {
  const { default: JsPDF } = await import('jspdf');
  const doc = new JsPDF({ unit: 'pt', format: 'a4' });
  const left = 56;
  let y = 72;

  // Header band
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, 595, 8, 'F');

  doc.setTextColor(17, 24, 39);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('FitSmart — Health Report', left, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(107, 114, 128);
  y += 22;
  doc.text(`Generated ${new Date().toLocaleDateString()}`, left, y);

  y += 34;
  rows.forEach((row) => {
    doc.setDrawColor(229, 231, 235);
    doc.line(left, y + 6, 539, y + 6);
    doc.setTextColor(55, 65, 81);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(row.label, left, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(17, 24, 39);
    doc.text(row.value, 539, y, { align: 'right' });
    y += 30;
  });

  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(
    'Estimates only — not medical advice. Consult a professional before major changes.',
    left,
    800,
  );

  doc.save('fitsmart-health-report.pdf');
}
