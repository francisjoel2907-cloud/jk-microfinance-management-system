import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import type { CollectionReport, PaymentReport } from "@/types/report.types";
import { formatCurrency } from "@/utils/currency";

export const generateCollectionReportPDF = (
  summary: CollectionReport,
  payments: PaymentReport[],
) => {
  const doc = new jsPDF();

  // ---------- Header ----------
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("KITE MICROFINANCE", 14, 18);

  doc.setFontSize(13);
  doc.text("Collection Report", 14, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 35);

  // ---------- Summary ----------
  let y = 48;

  doc.setFont("helvetica", "bold");
  doc.text("Summary", 14, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  const summaryRows = [
    ["Total Collected", formatCurrency(summary.totalCollected)],
    ["Today's Collection", formatCurrency(summary.todayCollections)],
    ["Monthly Collection", formatCurrency(summary.monthlyCollections)],
    ["Total Payments", String(summary.paymentsCount)],
  ];

  autoTable(doc, {
    startY: y,
    head: [["Metric", "Value"]],
    body: summaryRows,
    theme: "grid",
    headStyles: {
      fillColor: [22, 163, 74],
    },
  });

  // ---------- Payment Table ----------
  const finalY = (doc as any).lastAutoTable.finalY + 12;

  doc.setFont("helvetica", "bold");
  doc.text("Payment Details", 14, finalY);

  autoTable(doc, {
    startY: finalY + 5,

    head: [["Customer", "Phone", "Amount", "Method", "Date"]],

    body: payments.map((payment) => [
      payment.customerName,
      payment.phone,
      formatCurrency(payment.amount),
      payment.paymentMethod,
      new Date(payment.paymentDate).toLocaleDateString(),
    ]),

    theme: "striped",

    headStyles: {
      fillColor: [37, 99, 235],
    },

    styles: {
      fontSize: 8,
    },
  });

  // ---------- Footer ----------
  const pageHeight = doc.internal.pageSize.height;

  doc.setDrawColor(220);
  doc.line(14, pageHeight - 15, 196, pageHeight - 15);

  doc.setFontSize(8);
  doc.setTextColor(120);

  doc.text("JK Microfinance Management System", 14, pageHeight - 8);

  doc.save(`collection-report-${new Date().toISOString().slice(0, 10)}.pdf`);
};
