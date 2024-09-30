// 첫 번째 네비게이션 (프로덕션 & 캘린더)
const productionTab = document.getElementById("production");
const calendarTab = document.getElementById("calendar");
const productionContent = document.getElementById("tabContents-pd");
const calendarContent = document.getElementById("tabContents-cal");

// 두 번째 네비게이션 (1월 ~ 12월)
const monthTabs = document.querySelectorAll(".month-tabs button");
const productionPanels = productionContent.querySelectorAll(".panelBox .pdContent");
const calendarPanels = calendarContent.querySelectorAll(".panelBox .calContent");

function switchMainTab(selectedTab, deselectedTab, selectedContent, deselectedContent) {
   // 첫 번째 네비게이션 활성화/비활성화
   selectedTab.setAttribute("aria-selected", "true");
   deselectedTab.setAttribute("aria-selected", "false");

   // 해당 콘텐츠 표시/숨기기
   selectedContent.hidden = false;
   deselectedContent.hidden = true;

   // 월별 패널 초기화 (1월로 기본 설정)
   resetMonthPanels();
}

function resetMonthPanels() {
   monthTabs[0].click(); // 1월 탭 클릭 (기본값)
}

// 프로덕션 탭 클릭 이벤트
productionTab.addEventListener("click", () => {
   switchMainTab(productionTab, calendarTab, productionContent, calendarContent);
});

// 캘린더 탭 클릭 이벤트
calendarTab.addEventListener("click", () => {
   switchMainTab(calendarTab, productionTab, calendarContent, productionContent);
});

// 두 번째 네비게이션 (1월~12월) 클릭 시 패널 전환
monthTabs.forEach((tab) => {
   tab.addEventListener("click", () => {
      const month = tab.getAttribute("data-month");

      // 프로덕션 패널 전환
      productionPanels.forEach((panel) => {
         panel.hidden = panel.getAttribute("data-month") !== month;
      });

      // 캘린더 패널 전환
      calendarPanels.forEach((panel) => {
         panel.hidden = panel.getAttribute("data-month") !== month;
      });

      // 클릭된 월 탭 활성화
      monthTabs.forEach((btn) => btn.setAttribute("aria-selected", btn === tab));
   });
});

// 페이지 로드시 기본 탭 설정
productionTab.click(); // 기본으로 프로덕션 탭을 클릭한 상태로 설정
