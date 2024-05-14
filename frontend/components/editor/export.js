import html2pdf from "html2pdf.js";

export function exportAsPdf(content) {
  // https://ekoopmans.github.io/html2pdf.js/
  const opt = {
    // margin: 10,
    filename: `md.pdf`,
    // https://html2canvas.hertzen.com/configuration
    html2canvas: {
      scale: 2,
      useCORS: true,
    },
    // 智能分页，防止图片被截断
    pagebreak: { mode: "avoid-all" },
    // 支持文本中放链接，可点击跳转，默认true
    // enableLinks: true
  };

  console.log(content);

  html2pdf()
    .set(opt)
    .from(content)
    .save()
    .then(() => {
      console.log("success");
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      console.log("finally");
    });
}
