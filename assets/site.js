(function () {
  var D = window.SERVEWAY;
  var page = document.body.dataset.page;
  var app = document.getElementById("app");

  var NAV = [
    { id: "home", label: "홈", href: "index.html" },
    { id: "rules", label: "회칙", href: "rules.html" },
    { id: "activities", label: "활동", href: "activities.html" },
    { id: "members", label: "회원", href: "members.html" },
    { id: "staff", label: "운영진", href: "staff.html" },
    { id: "faq", label: "FAQ", href: "faq.html" }
  ];

  function badge(on) {
    return on ? '<span class="badge">운영진 확인 중</span>' : "";
  }
  function title(text) {
    return '<h2 class="sec-title">' + text + "</h2>";
  }
  function cards(list, cols, fn) {
    return '<div class="grid ' + cols + '">' + list.map(fn).join("") + "</div>";
  }
  function fmt(d) {
    return d ? d.replace(/-/g, ". ") + "." : "";
  }

  function header() {
    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.id === page ? ' class="on"' : "") + ">" + n.label + "</a>";
    }).join("");
    links += D.tennisDrawUrl
      ? '<a class="ext" href="' + D.tennisDrawUrl + '" target="_blank" rel="noopener">TennisDraw</a>'
      : '<a class="ext off" title="링크 준비 중">TennisDraw</a>';
    return (
      '<header class="site-header"><div class="wrap">' +
      '<a class="brand" href="index.html"><img src="assets/favicon.png" alt=""><span>' + D.club.nameEn + "</span></a>" +
      '<nav class="nav">' + links + "</nav></div></header>"
    );
  }

  function pageHead(h, p) {
    return '<div class="page-head"><div class="wrap"><h1>' + h + "</h1><p>" + p + "</p></div></div>";
  }

  function footer() {
    return '<footer class="site-footer"><div class="wrap"><strong>' + D.club.nameEn + "</strong> · 나주 테니스 클럽 서브웨이 · EST. 2023</div></footer>";
  }

  function revisionNotice(withLink) {
    var r = D.revision;
    var text;
    if (r.state === "objection") {
      text = "<strong>회칙 개정안 · 이의기간 " + fmt(r.noticeDate) + " ~ " + fmt(r.objectionEnd) + "</strong><br>의견이나 반대는 이 기간 안에 운영진에게 알려 주세요. 반대가 없거나 대화로 정리되면 이의기간이 끝난 다음 날부터 시행합니다.";
    } else if (r.state === "effective") {
      text = "<strong>" + fmt(r.effectiveDate) + " 시행</strong> 현재 적용 중인 회칙과 운영 세칙입니다.";
    } else {
      text = "<strong>회칙 개정안 · 운영진 검토 중</strong><br>아직 회원에게 공지하기 전인 초안입니다. 확정될 때까지는 2024. 10. 17. 제정 회칙이 적용됩니다.";
    }
    if (withLink && r.state !== "effective") text += ' <a href="rules.html">개정안 보기</a>';
    return '<div class="notice">' + text + "</div>";
  }

  /* 홈 */
  function home() {
    var c = D.club;
    var links = [
      { href: "members.html", t: "회원", d: "회비, 혜택, 알아 두면 좋은 것" },
      { href: "activities.html", t: "활동", d: "정기 모임, 월례대회, 코트 안내" },
      { href: "staff.html", t: "운영진", d: "누가 무엇을 맡는지, 운영진 혜택" },
      { href: "rules.html", t: "회칙", d: "회칙과 운영 세칙 전문" },
      { href: "faq.html", t: "FAQ", d: "자주 묻는 질문" }
    ];
    var draw = D.tennisDrawUrl
      ? '<a class="card link" href="' + D.tennisDrawUrl + '" target="_blank" rel="noopener"><h3>TennisDraw</h3><p>월례대회 대진과 기록</p></a>'
      : '<a class="card link off"><h3>TennisDraw</h3><p>월례대회 대진과 기록 (링크 준비 중)</p></a>';
    return (
      '<div class="hero"><div class="wrap">' +
      '<img src="assets/logo.png" alt="서브웨이 로고">' +
      '<div><div class="eyebrow">NAJU TENNIS CLUB · EST. 2023</div><h1>' + c.nameEn + "</h1>" +
      '<p class="tagline">' + c.tagline + '</p><p class="intro">' + c.intro + "</p></div>" +
      "</div></div>" +
      '<main><div class="wrap">' +
      "<section>" + title("한눈에 보기") +
      cards(c.facts, "g4", function (f) {
        return '<div class="card fact"><div class="label">' + f.label + '</div><div class="value">' + f.value + "</div></div>";
      }) + "</section>" +
      "<section>" + title("바로 가기") +
      cards(links, "g3", function (l) {
        return '<a class="card link" href="' + l.href + '"><h3>' + l.t + "</h3><p>" + l.d + "</p></a>";
      }).replace(/<\/div>$/, draw + "</div>") + "</section>" +
      "<section>" + title("알림") + revisionNotice(true) + "</section>" +
      "</div></main>"
    );
  }

  /* 활동 */
  function activities() {
    var a = D.activities;
    return (
      pageHead("활동", "서브웨이가 주로 하는 활동과 모이는 코트입니다.") +
      '<main><div class="wrap">' +
      "<section>" + title("정기 모임") +
      '<div class="table-wrap"><table><tr><th>요일</th><th>시간</th><th>코트</th><th>비고</th></tr>' +
      a.regular.map(function (r) {
        return "<tr><td><strong>" + r.day + "</strong></td><td>" + r.time + "</td><td>" + r.place + "</td><td>" + r.note + "</td></tr>";
      }).join("") + "</table></div>" +
      '<p class="note">' + a.regularNote + "</p></section>" +
      "<section>" + title("주요 활동") +
      cards(a.kinds, "g3", function (k) {
        return '<div class="card"><h3>' + k.title + "</h3><p>" + k.body + "</p></div>";
      }) + "</section>" +
      "<section>" + title("코트 안내") +
      '<p class="sec-desc">' + a.courtsNote + "</p>" +
      cards(a.courts, "g2", function (c) {
        return (
          '<div class="card"><h3>' + c.name + '</h3><div class="sub">' + c.use + "</div><p>" + c.note.replace(/([.?!])\s+/g, "$1<br>") + "</p>" +
          '<p class="addr">' + c.address + ' · <a href="https://map.naver.com/p/search/' + encodeURIComponent(c.map) + '" target="_blank" rel="noopener">네이버 지도 ↗</a></p></div>'
        );
      }) + "</section>" +
      "</div></main>"
    );
  }

  /* 회원 */
  function members() {
    var m = D.members;
    return (
      pageHead("회원", "회원이라면 알아 두면 좋은 회비와 혜택입니다.") +
      '<main><div class="wrap">' +
      "<section>" + title("회비") +
      cards(m.fees, "g4", function (f) {
        return '<div class="card fact"><div class="label">' + f.label + '</div><div class="value">' + f.value + '</div><div class="note">' + f.note + "</div></div>";
      }) + "</section>" +
      "<section>" + title("회원 혜택") +
      '<p class="sec-desc">가입비와 회비를 낸 정회원이 받는 혜택입니다.</p>' +
      cards(m.benefits, "g2", function (b) {
        return (
          '<div class="card"><h3>' + b.title + badge(b.pending) + '</h3><div class="sub">' + b.who + "</div><table>" +
          b.rows.map(function (r) { return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>"; }).join("") +
          "</table>" + (b.note ? "<p>" + b.note + "</p>" : "") + "</div>"
        );
      }) + "</section>" +
      "<section>" + title("알아 두면 좋은 것") +
      cards(m.good, "g3", function (g) {
        return '<div class="card"><h3>' + g.title + "</h3><p>" + g.body + "</p></div>";
      }) +
      '<p class="note">자세한 기준은 <a href="rules.html#bylaws">운영 세칙</a>에 있습니다.</p></section>' +
      "</div></main>"
    );
  }

  /* 운영진 */
  function staff() {
    var s = D.staff;
    return (
      pageHead("운영진", s.year + "년 서브웨이를 운영하는 사람들입니다.") +
      '<main><div class="wrap">' +
      "<section>" + title(s.year + "년 운영진") +
      cards(s.people, "g3", function (p) {
        return '<div class="card person"><div class="role">' + p.role + '</div><div class="name">' + p.name + "</div><p>" + p.duty + "</p></div>";
      }) + "</section>" +
      "<section>" + title("운영진 혜택") +
      '<p class="sec-desc">' + s.benefitsNote + "</p>" +
      cards(s.benefits, "g2", function (b) {
        return '<div class="card"><h3>' + b.title + badge(b.pending) + "</h3><p>" + b.body + "</p></div>";
      }) + "</section>" +
      "<section>" + title("운영진은 이렇게 정합니다") +
      cards(s.how, "g3", function (h) {
        return '<div class="card"><h3>' + h.title + "</h3><p>" + h.body + "</p></div>";
      }) +
      '<p class="note">' + s.howNote + ' <a href="rules.html">회칙 보기</a></p></section>' +
      "</div></main>"
    );
  }

  /* FAQ */
  function faq() {
    return (
      pageHead("FAQ", "회원들이 자주 묻는 질문입니다.") +
      '<main><div class="wrap">' +
      D.faq.map(function (f) {
        return '<details class="faq"><summary>' + f.q + "</summary><p>" + f.a + "</p></details>";
      }).join("") +
      "</div></main>"
    );
  }

  /* 회칙 */
  var DOCS = { rules: "content/rules.md", bylaws: "content/bylaws.md" };

  function rules() {
    return (
      pageHead("회칙", "서브웨이의 회칙과 운영 세칙입니다.") +
      '<main><div class="wrap">' + revisionNotice(false) +
      '<div class="tabs"><button data-doc="rules">회칙</button><button data-doc="bylaws">운영 세칙</button></div>' +
      '<div class="toc" id="toc"></div><div class="doc" id="doc">불러오는 중입니다.</div>' +
      '<p class="note">회칙은 클럽 운영의 기본 원칙이고, 운영 세칙은 금액과 혜택, 절차 같은 세부 사항입니다. ' +
      '<a href="content/serveway-rules-20241017.pdf" target="_blank" rel="noopener">현행 회칙(2024. 10. 17. 제정) PDF 보기</a></p>' +
      "</div></main>"
    );
  }

  function loadDoc(key, keepHash) {
    var doc = document.getElementById("doc");
    var toc = document.getElementById("toc");
    document.querySelectorAll(".tabs button").forEach(function (b) {
      b.classList.toggle("on", b.dataset.doc === key);
    });
    fetch(DOCS[key])
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(function (md) {
        var html = window.marked.parse(md, { breaks: true, gfm: true });
        doc.innerHTML = html.replace(/【([^】]*)】/g, "<mark>$1</mark>");
        doc.querySelectorAll("table").forEach(function (t) {
          var w = document.createElement("div");
          w.className = "table-wrap";
          t.parentNode.insertBefore(w, t);
          w.appendChild(t);
        });
        var items = [];
        doc.querySelectorAll("h2").forEach(function (h, i) {
          h.id = key + "-" + (i + 1);
          items.push('<a href="#' + h.id + '">' + h.textContent + "</a>");
        });
        toc.innerHTML = items.join("");
        if (!keepHash) history.replaceState(null, "", "#" + key);
      })
      .catch(function () {
        doc.textContent = "문서를 불러오지 못했습니다. 잠시 후 다시 열어 주세요.";
      });
  }

  var views = { home: home, rules: rules, activities: activities, members: members, staff: staff, faq: faq };
  app.innerHTML = header() + views[page]() + footer();

  if (page === "rules") {
    document.querySelectorAll(".tabs button").forEach(function (b) {
      b.addEventListener("click", function () { loadDoc(b.dataset.doc); });
    });
    loadDoc(location.hash.indexOf("bylaws") === 1 ? "bylaws" : "rules", true);
  }
})();
