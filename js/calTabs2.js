// 캘린더 탭 & 패널(tab-panels-2)

const tabsContainer = document.querySelector(".month-tabs");
const tabButtons = tabsContainer.querySelectorAll("[role='tab']");
const tabPanels = document.querySelectorAll("role='tabpanel']");

const tabNext = tabsContainer.querySelector("#tab-next");
const tabPrev = tabsContainer.querySelector("#tab-prev");

const ACTIVE_CLASSNAME = "active";

// 초기 설정 - 첫 번째 탭과 패널을 활성화
function initTabs() {
    const firstTab = tabButtons[7]; 
    const firstPanel = document.getElementById(firstTab.getAttribute("aria-controls"));

    tabPanels.forEach(panel => (panel.hidden = true)); // 모든 패널 숨김
    
    firstTab.setAttribute("aria-selected", "true");
    firstPanel.hidden = false;
    firstTab.classList.add(ACTIVE_CLASSNAME);
    currentIndex = 7;  // 현재 첫 번째 탭으로 설정
}
initTabs();

// 月 탭을 클릭했을 때 실행되는 함수
function switchTab(newTab) {
    const activeTab = tabsContainer.querySelector('[aria-selected="true"]');
    const activePanelID = activeTab.getAttribute("aria-controls");
    const activePanel = document.getElementById(activePanelID);

    // 기존 활성화된 탭과 패널 비활성화
    activeTab.setAttribute("aria-selected", "false");
    activePanel.hidden = true;

    // 새로 선택된 탭과 해당 패널 활성화
    newTab.setAttribute("aria-selected", "true");
    const newPanelID = newTab.getAttribute("aria-controls"); 
    const newPanel = document.getElementById(newPanelID);
    newPanel.hidden = false;

    // 탭 색상 변경
    newTab.classList.add(ACTIVE_CLASSNAME);
    activeTab.classList.remove(ACTIVE_CLASSNAME);

    // currentIndex를 업데이트 (새로 선택된 탭의 인덱스 찾기)
    currentIndex = Array.from(tabButtons).indexOf(newTab);
}

// 月 탭 버튼에 클릭 이벤트 추가
tabButtons.forEach(tab => {
    tab.addEventListener("click", (e) => {
        const clickedTab = e.target.closest("button");
        if (clickedTab && clickedTab !== tabsContainer.querySelector('[aria-selected="true"]')) {
            switchTab(clickedTab);
        }
    });
});

// 화살표 버튼 클릭 시 탭 전환
function switchArrTab(newIndex) {
    const activeTab = tabButtons[currentIndex];
    const activePanel = document.getElementById(activeTab.getAttribute("aria-controls"));

    // 현재 탭 비활성화
    activeTab.setAttribute("aria-selected", "false");
    activePanel.hidden = true;
    activeTab.classList.remove(ACTIVE_CLASSNAME);

    // 새로운 탭 활성화
    const newTab = tabButtons[newIndex];
    const newPanel = document.getElementById(newTab.getAttribute("aria-controls"));
    newTab.setAttribute("aria-selected", "true");
    newPanel.hidden = false;
    newTab.classList.add(ACTIVE_CLASSNAME);

    // currentIndex 업데이트
    currentIndex = newIndex;
}

function nextTab() {
    const newIndex = (currentIndex + 1) % tabButtons.length; // 다음 탭 인덱스
    switchArrTab(newIndex);
}

function prevTab() {
    const newIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length; // 이전 탭 인덱스
    switchArrTab(newIndex);
}

// 화살표 버튼에 클릭 이벤트 추가
tabNext.addEventListener("click", nextTab);
tabPrev.addEventListener("click", prevTab);
