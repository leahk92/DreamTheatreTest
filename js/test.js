// 탭 - 오버뷰
const pdTab = document.getElementById("production");
const calTab = document.getElementById("calendar");

// 탭 - 월
const monthTabs = document.querySelector(".month-tabs");
const monthTab = document.querySelectorAll(".month-tabs [role='tab']");

// 패널
const panelBoxes = document.querySelectorAll(".panelBox");
const pdPanel = document.querySelectorAll(".pdContent");
const calPanel = document.querySelectorAll(".calContent");

const ACTIVE_CLASSNAME = "active";
let currentMode = "pd"; // 기본 모드는 pd (프로덕션)

// 초기설정
function initSet() {
    const firstTab = monthTab[0]; // 1월 탭을 첫 번째로 설정
    const firstPanel = document.getElementById(firstTab.getAttribute("aria-controls")); // 해당 탭에 연결된 패널 선택

    // 모든 패널을 숨김 처리
    panelBoxes.forEach(panel => (panel.hidden = true));
    pdPanel.forEach(panel => (panel.hidden = true));
    calPanel.forEach(panel => (panel.hidden = true));

    // 첫 번째 탭 활성화 및 해당 패널 보이기
    firstTab.setAttribute("aria-selected", "true");
    firstPanel.hidden = false;

    // 프로덕션 패널을 기본으로 보이기
    pdPanel[0].hidden = false;
    
    // 활성화 탭 색상 표시
    firstTab.classList.add(ACTIVE_CLASSNAME);
}

// 초기설정 호출
initSet();

// 탭 전환 함수
function switchTab(newTab, mode) {
    const activeTab = monthTabs.querySelector('[aria-selected="true"]'); //기존 활성화탭 지정
    const activePanelID = activeTab.getAttribute("aria-controls");
    const activePanel = document.getElementById(activePanelID);

    // 기존 활성화된 탭과 패널 비활성화
    activeTab.setAttribute("aria-selected", "false"); // 기존 활성화탭을 비활성화
    activePanel.hidden = true; // 기존 활성화패널 숨기기

    // 새로 선택된 탭과 해당 패널 활성화
    newTab.setAttribute("aria-selected", "true");
    const newPanelID = newTab.getAttribute("aria-controls");
    const newPanel = document.getElementById(newPanelID);
    newPanel.hidden = false;

    // 탭 색상 변경
    newTab.classList.add(ACTIVE_CLASSNAME);
    activeTab.classList.remove(ACTIVE_CLASSNAME);

    // 프로덕션 모드인지 캘린더 모드인지 확인하고 패널 전환
    if (mode === "pd") {
        pdPanel.forEach(panel => (panel.hidden = true)); // 모든 pdPanel 숨기기
        calPanel.forEach(panel => (panel.hidden = true)); // 모든 calPanel 숨기기

        const monthIndex = [...monthTab].indexOf(newTab); // 새 탭의 월 인덱스 가져오기
        pdPanel[monthIndex].hidden = false; // 해당 월의 pdPanel만 보이기
    } else if (mode === "cal") {
        pdPanel.forEach(panel => (panel.hidden = true)); // 모든 pdPanel 숨기기
        calPanel.forEach(panel => (panel.hidden = true)); // 모든 calPanel 숨기기

        const monthIndex = [...monthTab].indexOf(newTab); // 새 탭의 월 인덱스 가져오기
        calPanel[monthIndex].hidden = false; // 해당 월의 calPanel만 보이기
    }
}

// 월 탭 : 버튼 클릭 이벤트
monthTab.forEach(tab => {
    tab.addEventListener("click", (e) => {
        const clickedTab = e.target.closest("button");
        if (clickedTab && clickedTab !== monthTabs.querySelector('[aria-selected="true"]')) {
            switchTab(clickedTab, currentMode);
        }
    });
});

// 오버뷰 탭: 프로덕션/캘린더 전환 이벤트
pdTab.addEventListener("click", () => {
    currentMode = "pd"; // 프로덕션 모드로 설정
    pdTab.setAttribute("aria-selected", "true");
    calTab.setAttribute("aria-selected", "false");

    // 현재 활성화된 월 탭에 맞는 패널 표시
    const activeMonthTab = monthTabs.querySelector('[aria-selected="true"]');
    switchTab(activeMonthTab, currentMode);
});

calTab.addEventListener("click", () => {
    currentMode = "cal"; // 캘린더 모드로 설정
    calTab.setAttribute("aria-selected", "true");
    pdTab.setAttribute("aria-selected", "false");

    // 현재 활성화된 월 탭에 맞는 패널 표시
    const activeMonthTab = monthTabs.querySelector('[aria-selected="true"]');
    switchTab(activeMonthTab, currentMode);
});
