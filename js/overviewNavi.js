// 프로덕션/캘린더 탭 버튼 및 패널
const productionTab = document.getElementById('production');
const calendarTab = document.getElementById('calendar');
const productionPanel = document.getElementById('wrap-tabContents-01');
const calendarPanel = document.getElementById('wrap-tabContents-02');

const monthTabs = document.querySelector(".month-tabs");
const monthTab = document.querySelectorAll("[role='tab']");

const pdEachPanel = productionPanel.querySelectorAll("[role='tabpanel']");
const calEachPanel = calendarPanel.querySelectorAll("[role='tabpanel']");

// 화살표
const tabNext = document.getElementById('tab-next');
const tabPrev = document.getElementById('tab-prev');

const ACTIVE_CLASSNAME = "active";

// 탭 활성화 상태 변경 함수
function activateTab(tabButton, panel) {
    // 모든 탭 비활성화
    // productionTab.setAttribute('aria-selected', 'false');
    // calendarTab.setAttribute('aria-selected', 'false');
    
    // 모든 패널 숨기기
    productionPanel.hidden = true;
    calendarPanel.hidden = true;
    
    // 클릭된 탭 활성화
    tabButton.setAttribute('aria-selected', 'true');
    
    // 해당 패널 표시
    panel.hidden = false;
    // --끝--

    //초기 설정 - 첫 번째 탭과 패널을 활성화
    const firstTab = monthTab[7]; 
    const firstPanel = pdEachPanel.getElementById(firstTab.getAttribute("aria-controls"));
    
    productionPanel.forEach(panel => (panel.hidden = true));
    calendarPanel.forEach(panel => (panel.hidden = true)); // 모든 패널 숨김
    
    firstTab.setAttribute("aria-selected", "true");
    firstPanel.hidden = false;
    firstTab.classList.add(ACTIVE_CLASSNAME);
    // currentIndex = 7;  // 현재 첫 번째 탭으로 설정
}

// 프로덕션 탭 클릭 이벤트
productionTab.addEventListener('click', () => {
    activateTab(productionTab, productionPanel);
});

// 캘린더 탭 클릭 이벤트
calendarTab.addEventListener('click', () => {
    activateTab(calendarTab, calendarPanel);
});

// 초기 설정 - 프로덕션 탭을 기본으로 표시
activateTab(productionTab, productionPanel);


// 月 탭을 클릭했을 때 실행되는 함수
function switchTab(newTab) {
    const activeTab = monthTabs.querySelector('[aria-selected="true"]');
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
    currentIndex = Array.from(monthTab).indexOf(newTab);
}

// 月 탭 버튼에 클릭 이벤트 추가
monthTab.forEach(tab => {
    tab.addEventListener("click", (e) => {
        const clickedTab = e.target.closest("button");
        if (clickedTab && clickedTab !== monthTabs.querySelector('[aria-selected="true"]')) {
            switchTab(clickedTab);
        }
    });
});

// 화살표 버튼 클릭 시 탭 전환
function switchArrTab(newIndex) {
    const activeTab = monthTab[currentIndex];
    const activePanel = document.getElementById(activeTab.getAttribute("aria-controls"));

    // 현재 탭 비활성화
    activeTab.setAttribute("aria-selected", "false");
    activePanel.hidden = true;
    activeTab.classList.remove(ACTIVE_CLASSNAME);

    // 새로운 탭 활성화
    const newTab = monthTab[newIndex];
    const newPanel = document.getElementById(newTab.getAttribute("aria-controls"));
    newTab.setAttribute("aria-selected", "true");
    newPanel.hidden = false;
    newTab.classList.add(ACTIVE_CLASSNAME);

    // currentIndex 업데이트
    currentIndex = newIndex;
}

function nextTab() {
    const newIndex = (currentIndex + 1) % monthTab.length; // 다음 탭 인덱스
    switchArrTab(newIndex);
}

function prevTab() {
    const newIndex = (currentIndex - 1 + monthTab.length) % monthTab.length; // 이전 탭 인덱스
    switchArrTab(newIndex);
}

// 화살표 버튼에 클릭 이벤트 추가
tabNext.addEventListener("click", nextTab);
tabPrev.addEventListener("click", prevTab);
