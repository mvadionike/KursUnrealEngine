const lessons = [
  {
    id: "lecture-1",
    number: "01",
    title: "Старт работы в Unreal Engine 5",
    level: "Beginner",
    duration: "95 минут",
    outcome: "Создан первый проект, настроена сцена, понятны базовые панели редактора.",
    summary: "Большая стартовая лекция о том, как устроен UE5, где находятся главные инструменты и как безопасно начать проект.",
    preview: "mini-viewport",
    tags: ["Editor", "Project Setup", "Viewport"],
    sections: [
      ["Зачем нужен Unreal Engine 5", "UE5 используется для AAA-игр, архитектурной визуализации, виртуального продакшена и интерактивных симуляторов. Для новичка важно понять: движок состоит не из одной кнопки Play, а из набора систем: уровни, акторы, компоненты, ассеты, материалы, Blueprints, освещение, физика и UI."],
      ["Пошаговая установка", "Установите Epic Games Launcher, выберите актуальную версию Unreal Engine 5.x, создайте проект Third Person и сохраните его в отдельной папке без кириллицы в пути. Это снижает риск проблем с плагинами, импортом ассетов и сборкой."],
      ["Как читать интерфейс", "Viewport показывает мир игры. World Outliner хранит список объектов. Details Panel редактирует свойства выбранного объекта. Content Browser содержит ассеты проекта. Toolbar запускает игру, сборку света, сохранение и основные режимы редактора."],
      ["Совет новичку", "Не пытайтесь сразу делать огромный мир. Первые 2-3 проекта должны быть маленькими: одна комната, один персонаж, одна механика. Так вы быстрее понимаете причинно-следственные связи в движке."]
    ],
    blueprint: ["Create Project", "Add Actors", "Save Level"],
    code: `// Naming convention example
Maps/ML_FirstRoom
Blueprints/BP_PlayerCharacter
Blueprints/BP_Door_Interactive
Materials/M_GlowPanel`,
    homework: "Создайте уровень ML_TrainingRoom, добавьте пол, 4 стены, 3 объекта-препятствия, Directional Light и Player Start. Сделайте скриншот Viewport и сохраните проект."
  },
  {
    id: "lecture-2",
    number: "02",
    title: "Blueprint System",
    level: "Core",
    duration: "120 минут",
    outcome: "Собран Blueprint интерактивной двери с Trigger Box, Timeline и переменными.",
    summary: "Подробный разбор визуального программирования: события, переменные, условия, ссылки на объекты и чистая организация графов.",
    preview: "mini-blueprint",
    tags: ["Blueprint", "Logic", "Events"],
    sections: [
      ["Что такое Blueprint", "Blueprint — визуальный способ описывать игровую логику. Вместо строк кода вы соединяете ноды. Белые линии отвечают за порядок выполнения, цветные линии передают данные: числа, ссылки, векторы, состояния."],
      ["Главные события", "BeginPlay срабатывает при запуске игры, Tick вызывается каждый кадр, Input Action реагирует на ввод, Overlap нужен для зон взаимодействия. Новичкам важно не перегружать Tick: если логика не нужна каждый кадр, используйте события."],
      ["Переменные и условия", "Boolean хранит true/false, Float хранит дробные числа, Vector хранит координаты, Object Reference хранит ссылку на объект. Branch работает как развилка: если условие true, выполняется одна ветка, иначе другая."],
      ["Пример из разработки", "Дверь в игре почти всегда является комбинацией Trigger Zone, состояния IsOpen, Timeline-анимации и проверки, может ли игрок взаимодействовать сейчас."]
    ],
    blueprint: ["On Begin Overlap", "Branch IsLocked", "Play Timeline", "Set Relative Rotation"],
    code: `Event Interact
  Branch CanInteract
    True  -> Play DoorTimeline
    False -> Print "Door is locked"`,
    homework: "Сделайте BP_Door: дверь открывается при входе игрока в Trigger Box и закрывается при выходе. Добавьте переменную IsLocked."
  },
  {
    id: "lecture-3",
    number: "03",
    title: "Создание персонажа",
    level: "Core",
    duration: "130 минут",
    outcome: "Персонаж ходит, прыгает, бегает, камера следует за ним, а анимации меняются по скорости.",
    summary: "Разбираем Character, камеру от третьего лица, Enhanced Input, Character Movement и базовый Animation Blueprint.",
    preview: "mini-viewport",
    tags: ["Character", "Camera", "Animation"],
    sections: [
      ["Pawn vs Character", "Pawn — управляемый объект. Character — специализированный Pawn с капсулой, движением и поддержкой ходьбы, прыжка и гравитации. Для большинства third-person прототипов начинайте с Character."],
      ["Камера", "Spring Arm работает как стабилизатор камеры: он держит дистанцию, сглаживает движение и предотвращает прохождение камеры сквозь стены. Camera прикрепляется к Spring Arm."],
      ["Enhanced Input", "Создайте Input Mapping Context и Input Actions: IA_Move, IA_Look, IA_Jump, IA_Sprint. Это современный способ организовать управление в UE5."],
      ["Анимации", "Animation Blueprint получает скорость персонажа и на основе Speed переключает Idle, Walk и Run. Важно не делать резкие переходы: используйте blend-переходы."]
    ],
    blueprint: ["Input Move", "Add Movement Input", "Input Sprint", "Set Max Walk Speed"],
    code: `If SprintPressed:
  MaxWalkSpeed = 650
Else:
  MaxWalkSpeed = 350`,
    homework: "Добавьте бег по Shift, прыжок по Space, плавный поворот камеры мышью и переменную Speed в Animation Blueprint."
  },
  {
    id: "lecture-4",
    number: "04",
    title: "Физика и взаимодействия",
    level: "Intermediate",
    duration: "115 минут",
    outcome: "Объекты корректно сталкиваются, двигаются, запускают события и не ломают сцену.",
    summary: "Collision, Physics, Trigger zones, pickup-объекты, нажимные плиты и типичные ошибки физики.",
    preview: "mini-viewport",
    tags: ["Physics", "Collision", "Triggers"],
    sections: [
      ["Collision Presets", "Коллизии определяют, кто с кем сталкивается. Block останавливает объект, Overlap пропускает, но вызывает событие, Ignore полностью игнорирует объект."],
      ["Simulate Physics", "Если включить Simulate Physics, объект начинает подчиняться гравитации, массе и импульсам. Для стабильности проверяйте массу, damping и простую collision geometry."],
      ["Trigger zones", "Trigger Box обычно невидим в игре, но реагирует на вход игрока. На нем удобно строить двери, ловушки, контрольные точки, зоны обучения и pickup-системы."],
      ["Ошибки новичков", "Самая частая ошибка — включить физику на объекте без корректной коллизии. Вторая — использовать Overlap там, где нужен Block. Третья — забыть проверить, что в зону вошел именно игрок."]
    ],
    blueprint: ["OnComponentBeginOverlap", "Cast To Player", "Add Impulse", "Set Door State"],
    code: `On Overlap
  Cast to BP_PlayerCharacter
  If Success:
    Add Score +1
    Destroy Pickup`,
    homework: "Создайте нажимную плиту: когда физический куб лежит на плите, дверь открыта; когда куб убрали, дверь закрывается."
  },
  {
    id: "lecture-5",
    number: "05",
    title: "Создание игрового уровня",
    level: "Intermediate",
    duration: "140 минут",
    outcome: "Собран читаемый игровой уровень с маршрутом, светом, окружением и визуальными ориентирами.",
    summary: "От blockout до атмосферы: layout, landscape, lighting, environment, композиция и путь игрока.",
    preview: "mini-viewport",
    tags: ["Level Design", "Lighting", "Environment"],
    sections: [
      ["Blockout", "Blockout — черновая версия уровня из простых форм. Он нужен, чтобы проверить масштаб, маршрут, видимость цели и темп прохождения до того, как вы потратите время на красоту."],
      ["Маршрут игрока", "Игрок должен понимать, куда идти. Используйте свет, силуэты, цветовые акценты, высоту объектов и контраст, чтобы направлять внимание."],
      ["Lighting", "Directional Light задает солнце, Sky Atmosphere делает небо, Exponential Height Fog добавляет глубину, Post Process Volume помогает собрать итоговый стиль."],
      ["Environment", "Декорации должны поддерживать геймплей. Если объект не помогает навигации, атмосфере или интерактивности, он может мешать."]
    ],
    blueprint: ["Player Start", "Goal Actor", "Checkpoint", "Win Trigger"],
    code: `Level Flow:
Start -> Tutorial Obstacle -> Physics Puzzle -> Enemy Zone -> Final Trigger`,
    homework: "Соберите уровень с началом, целью, двумя препятствиями, одним интерактивным объектом и финальным триггером победы."
  },
  {
    id: "lecture-6",
    number: "06",
    title: "UI и оптимизация",
    level: "Advanced",
    duration: "125 минут",
    outcome: "Игра получает HUD, меню, экран завершения и базовую оптимизацию FPS.",
    summary: "Widget Blueprint, HUD, pause menu, player feedback, Stat FPS, LOD, Nanite и простая диагностика производительности.",
    preview: "mini-blueprint",
    tags: ["UI", "Optimization", "FPS"],
    sections: [
      ["UI как обратная связь", "Интерфейс должен отвечать на вопросы игрока: сколько здоровья осталось, какая цель, сколько очков собрано, почему дверь закрыта, что произошло после победы."],
      ["Widget Blueprint", "Canvas Panel дает свободное размещение элементов. Text выводит цель, Progress Bar показывает здоровье, Button нужен для меню. Главное — не перегружать экран."],
      ["Pause Menu", "При паузе нужно остановить игру, показать курсор, переключить Input Mode UI Only или Game and UI, а при продолжении вернуть Game Only."],
      ["Оптимизация", "Начните с Stat FPS. Затем проверяйте тяжелые материалы, лишние динамические источники света, слишком плотный foliage, отсутствие LOD и дорогие post-process эффекты."]
    ],
    blueprint: ["Create Widget", "Add to Viewport", "Set Input Mode UI", "Stat FPS"],
    code: `On Pause Pressed
  Set Game Paused true
  Create Widget WBP_PauseMenu
  Add To Viewport
  Show Mouse Cursor true`,
    homework: "Добавьте HUD с очками, pause menu, экран победы и проведите мини-аудит FPS на своем уровне."
  }
];

const practices = [
  ["Создание первой сцены","Easy",18,"Собрать тестовую комнату, проверить масштаб и базовую навигацию.","Создайте FirstScene, добавьте пол, стены, Player Start, Directional Light и 3 объекта-препятствия.","Настройте grid snapping 50, сохраните уровень как ML_FirstScene, назовите объекты SM_Wall_01, SM_Floor_01.","Blueprint не нужен: фокус на уровне, масштабе и организации проекта.","Если игрок проваливается, проверьте collision у пола. Если темно, проверьте Directional Light и Exposure.","Игрок стартует внутри комнаты, видит препятствия, камера не упирается в стену.","Готовый уровень и скриншот Viewport.",["Создан уровень","Добавлены пол и стены","Настроен свет","Проверен Player Start"]],
  ["Настройка персонажа","Easy",30,"Подготовить управляемого героя для прототипа.","Создайте BP_PlayerCharacter на основе Character, добавьте Mesh, Spring Arm и Camera.","Max Walk Speed 350, Jump Z Velocity 520, Spring Arm Length 320.","Input Jump -> Jump, Input Look -> Add Controller Yaw/Pitch Input.","Если персонаж не двигается, проверьте GameMode и Default Pawn Class.","Персонаж ходит, прыгает, камера следует за ним.","Видео 10-15 секунд.",["Создан BP_PlayerCharacter","Настроена камера","Работает прыжок","Проверен GameMode"]],
  ["Создание системы движения","Medium",42,"Добавить полноценное управление и бег.","Создайте IA_Move, IA_Look, IA_Jump, IA_Sprint и IMC_Player.","Добавьте Mapping Context в BeginPlay персонажа.","Sprint Pressed -> MaxWalkSpeed 650, Sprint Released -> 350.","Если input не работает, проверьте Enhanced Input Subsystem.","Есть ходьба, бег, прыжок, камера и понятные переменные.","Видео и скрин Event Graph.",["Созданы Input Actions","Подключен Mapping Context","Работает Sprint","Имена переменных понятные"]],
  ["Работа с Blueprint","Medium",54,"Сделать интерактивный объект с состояниями.","Создайте BP_Door с Static Mesh и Box Collision.","Timeline 0-1 за 1 секунду, Lerp rotation 0 -> 90.","On Begin Overlap -> Cast Player -> Play Timeline. On End Overlap -> Reverse.","Если дверь крутится не туда, проверьте pivot или ось вращения.","Дверь открывается и закрывается плавно.","Скрин Blueprint-графа.",["Создан BP_Door","Добавлен Trigger Box","Timeline работает","Есть Reverse"]],
  ["Добавление физики","Medium",64,"Настроить физические объекты и импульсы.","Добавьте 5 кубов с разной массой и включите Simulate Physics.","Mass: 10, 25, 50; Linear Damping 0.1-0.4.","При взаимодействии Add Impulse по forward vector игрока.","Если объекты дрожат, упростите collision и уменьшите масштаб пересечений.","Объекты толкаются, не проваливаются и не взрываются физикой.","Видео взаимодействия.",["Физика включена","Масса настроена","Impulse работает","Коллизии стабильны"]],
  ["Создание меню игры","Hard",76,"Сделать главное меню, HUD и pause menu.","Создайте WBP_MainMenu, WBP_HUD, WBP_PauseMenu.","Start открывает уровень, Quit закрывает игру, HUD показывает Score.","Esc -> Set Game Paused, Add Pause Widget, Show Mouse Cursor.","Если кнопки не кликаются, проверьте Input Mode и Focus.","Меню работает, HUD виден, пауза включается и выключается.","3 скриншота интерфейса.",["Main Menu создан","HUD показывает данные","Pause работает","Курсор управляется"]],
  ["Создание врагов","Hard",88,"Добавить простого врага с патрулем и реакцией на игрока.","Создайте BP_Enemy, PatrolPoint_A, PatrolPoint_B и сферу обнаружения.","Enemy двигается между точками, при Overlap меняет состояние на Chase.","Branch HasSeenPlayer -> Move To Player или Print Warning.","Если враг застревает, проверьте NavMeshBoundsVolume.","Враг патрулирует, замечает игрока и реагирует.","Видео 20 секунд и скрин логики.",["Есть BP_Enemy","Патруль работает","Зона обнаружения работает","Проверен NavMesh"]],
  ["Финальный мини-проект","Final",100,"Собрать законченный playable-прототип.","Объедините персонажа, уровень, дверь, физику, UI, врага и финальную цель.","Сделайте экран победы, поражения или завершения уровня.","Game Flow: Start -> Learn -> Challenge -> Enemy -> Goal -> Result Screen.","Если игрок не понимает цель, добавьте HUD-подсказку и визуальный ориентир.","Проект проходится от старта до финала без ручного вмешательства.","Билд или видео 60 секунд.",["Есть начало и финал","Есть 3 механики","Есть UI","Проект можно пройти"]]
];

const galleryItems = [
  ["scene","Neon Training Room","Игровая комната для первых упражнений","scene"],
  ["blueprint","Door Blueprint System","Логика двери через Trigger и Timeline","blueprint"],
  ["ui","HUD Combat Overlay","Интерфейс здоровья, очков и подсказок","ui"],
  ["physics","Physics Puzzle Arena","Комната с кубами, плитами и импульсами","physics"],
  ["scene","Landscape Prototype","Мини-уровень с маршрутом и светом","scene"],
  ["blueprint","Enemy Patrol Graph","Патруль врага и реакция на игрока","blueprint"]
];

const videos = [
  ["UE5 Interface Fundamentals","Разбор интерфейса и базового workflow","https://www.youtube.com/embed/k-zMkzmduqI"],
  ["Blueprint Visual Scripting","События, переменные и игровая логика","https://www.youtube.com/embed/EFXMW_UEDco"],
  ["Third Person Character Setup","Персонаж, камера и управление","https://www.youtube.com/embed/gQmiqmxJMtA"]
];

const quizQuestions = [
  ["Что хранит World Outliner?","Список объектов текущего уровня",["Список объектов текущего уровня","Только материалы","Настройки видеокарты","Историю коммитов"],"Beginner"],
  ["Какой компонент обычно отвечает за коллизию персонажа?","Capsule Component",["Spring Arm","Capsule Component","Directional Light","Widget"],"Beginner"],
  ["Что делает Branch в Blueprint?","Разделяет выполнение по условию true/false",["Создает материал","Разделяет выполнение по условию true/false","Импортирует текстуры","Запускает сборку проекта"],"Beginner"],
  ["Какое событие вызывается при старте игры?","BeginPlay",["Tick","BeginPlay","EndOverlap","Compile"],"Beginner"],
  ["Для чего нужен Spring Arm?","Для управления положением камеры и дистанцией",["Для физики объектов","Для управления положением камеры и дистанцией","Для сборки света","Для создания UI"],"Core"],
  ["Что лучше не перегружать тяжелой логикой каждый кадр?","Tick",["BeginPlay","Tick","Construction Script","Save All"],"Core"],
  ["Какая система ввода актуальна в UE5?","Enhanced Input",["Legacy Matinee","Enhanced Input","Cascade Only","BSP Input"],"Core"],
  ["Что делает Simulate Physics?","Включает физическое поведение объекта",["Включает физическое поведение объекта","Создает Widget","Открывает Content Browser","Меняет язык редактора"],"Core"],
  ["Что использовать для невидимой зоны события?","Trigger Box",["Sky Atmosphere","Trigger Box","Post Process","Texture Sample"],"Core"],
  ["Что означает Overlap в коллизиях?","Объекты пересекаются и вызывают событие",["Объекты пересекаются и вызывают событие","Объекты всегда блокируются","Объекты удаляются","Материал становится прозрачным"],"Intermediate"],
  ["Что такое blockout уровня?","Черновая форма уровня из простых объектов",["Финальный рендер","Черновая форма уровня из простых объектов","Список багов","Файл настроек"],"Intermediate"],
  ["Какой инструмент помогает проверить FPS?","Stat FPS",["Stat FPS","Brush Size","Rename","Play Sound"],"Intermediate"],
  ["Что показывает Progress Bar в UI?","Значение вроде здоровья или прогресса",["Значение вроде здоровья или прогресса","Только видео","Сетку уровня","Коллизии"],"Intermediate"],
  ["Что делает Add to Viewport?","Показывает Widget на экране",["Показывает Widget на экране","Добавляет врага","Сохраняет карту","Создает материал"],"Intermediate"],
  ["Зачем нужен NavMeshBoundsVolume?","Для навигации AI по уровню",["Для навигации AI по уровню","Для неба","Для favicon","Для LOD материалов"],"Advanced"],
  ["Что помогает уменьшить нагрузку дальних объектов?","LOD",["LOD","Print String","Player Start","Branch"],"Advanced"],
  ["Почему важно называть ассеты понятно?","Проект легче поддерживать и проверять",["Проект легче поддерживать и проверять","Так увеличивается FPS всегда","Это меняет физику","Это включает Nanite"],"Advanced"],
  ["Что такое Timeline в Blueprint?","Нода для анимации значений во времени",["Нода для анимации значений во времени","Список уровней","Тип освещения","Файл проекта"],"Advanced"],
  ["Что должен иметь финальный прототип?","Игровой цикл от старта до результата",["Игровой цикл от старта до результата","Только меню","Только красивый фон","Только один куб"],"Advanced"],
  ["Что делать, если игрок не понимает цель?","Добавить визуальные ориентиры и HUD-подсказку",["Удалить UI","Добавить визуальные ориентиры и HUD-подсказку","Увеличить массу кубов","Отключить камеру"],"Advanced"]
];

const loader = document.querySelector(".loader");
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const progress = document.querySelector(".scroll-progress");
const toTop = document.querySelector(".to-top");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const modalText = document.querySelector(".modal__text");
const modalClose = document.querySelector(".modal__close");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const canvas = document.querySelector(".particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let quizIndex = 0;
let quizScore = 0;
let answered = false;

const byId = (id) => document.getElementById(id);

function openModal(title, html) {
  modalTitle.textContent = title;
  modalText.innerHTML = html;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalText.innerHTML = "";
}

function renderLessons() {
  byId("lectureGrid").innerHTML = lessons.map((lesson) => `
    <article class="glass-card lesson-card reveal">
      <span class="lesson-card__number">${lesson.number}</span>
      <h3>${lesson.title}</h3>
      <div class="lesson-card__meta"><span class="pill">${lesson.level}</span><span class="pill">${lesson.duration}</span><span class="pill">${lesson.tags.join(" / ")}</span></div>
      <p>${lesson.summary}</p>
      <div class="lesson-preview"><div class="${lesson.preview}"></div><span class="ue-caption">UE5 training screenshot</span></div>
      <div class="lesson-result"><strong>Результат:</strong> ${lesson.outcome}</div>
      <button type="button" class="card-button" data-lesson="${lesson.id}">Открыть лекцию</button>
    </article>
  `).join("");
}

function lessonModal(lesson) {
  return `
    <div class="course-modal">
      <div class="lesson-preview"><div class="${lesson.preview}"></div><span class="ue-caption">Fake UE5 screenshot • ${lesson.title}</span></div>
      <p class="info-box"><strong>Итог лекции:</strong> ${lesson.outcome}</p>
      ${lesson.sections.map(([title, text]) => `<h4>${title}</h4><p>${text}</p>`).join("")}
      <h4>Blueprint-схема</h4>
      <div class="blueprint-diagram">${lesson.blueprint.map((node) => `<div class="bp-node">${node}</div>`).join("")}</div>
      <h4>Code block / псевдологика</h4>
      <pre><code>${lesson.code}</code></pre>
      <h4>Домашнее задание</h4>
      <p>${lesson.homework}</p>
    </div>
  `;
}

function renderPractices() {
  byId("practiceGrid").innerHTML = practices.map((p, index) => `
    <article class="glass-card practice-card reveal" style="--progress:${p[2]}%" data-practice="${index}">
      <i>${index + 1}</i><span class="completion-badge">Completed</span><span class="badge ${p[1].toLowerCase()}">${p[1]}</span>
      <h3>Практика ${index + 1}: ${p[0]}</h3>
      <div class="practice-meta"><span class="pill">${p[2]}% path</span><span class="pill">${p[1]}</span></div>
      <p><strong>Цель:</strong> ${p[3]}</p>
      <div class="practice-checklist">${p[10].map((item, itemIndex) => `<label><input type="checkbox" data-check="${index}-${itemIndex}"> ${item}</label>`).join("")}</div>
      <div class="bar"><span></span></div>
      <button type="button" class="card-button" data-practice-open="${index}">Открыть задание</button>
    </article>
  `).join("");
}

function practiceModal(p, index) {
  const blocks = [
    ["Подробное описание", p[4]],
    ["Настройки проекта", p[5]],
    ["Blueprint-логика", p[6]],
    ["Подсказки и возможные ошибки", p[7]],
    ["Проверка результата", p[8]],
    ["Итоговый результат проекта", p[9]]
  ];
  return `
    <div class="course-modal">
      <p class="info-box"><strong>Цель:</strong> ${p[3]}</p>
      ${blocks.map(([title, text]) => `<h4>${title}</h4><p>${text}</p>`).join("")}
      <h4>Checklist выполнения</h4>
      <ul>${p[10].map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
  `;
}

function updatePracticeProgress() {
  let total = 0;
  let checked = 0;
  document.querySelectorAll(".practice-card").forEach((card) => {
    const boxes = card.querySelectorAll("input[type='checkbox']");
    const done = card.querySelectorAll("input[type='checkbox']:checked");
    total += boxes.length;
    checked += done.length;
    card.classList.toggle("is-complete", boxes.length === done.length);
  });
  const percent = total ? Math.round((checked / total) * 100) : 0;
  byId("overallProgress").textContent = `${percent}%`;
  byId("overallProgressBar").style.width = `${percent}%`;
}

function renderGallery(filter = "all") {
  byId("projectGallery").innerHTML = galleryItems
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => filter === "all" || item[0] === filter)
    .map(({ item, index }) => `
      <article class="glass-card project-card reveal" data-gallery="${index}">
        <div class="project-shot ${item[3]}"></div>
        <div class="project-card__body"><span class="pill">${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p></div>
      </article>
    `).join("");
}

function renderGalleryFilters() {
  const filters = [["all","Все"],["scene","Сцены"],["blueprint","Blueprint"],["ui","UI"],["physics","Физика"]];
  byId("galleryFilters").innerHTML = filters.map(([id, label]) => `<button class="filter-btn ${id === "all" ? "is-active" : ""}" data-filter="${id}">${label}</button>`).join("");
}

function renderVideos() {
  byId("videoGrid").innerHTML = videos.map((video, index) => `
    <article class="glass-card video-card reveal" data-video="${index}">
      <div class="video-thumb"><span class="play-button">▶</span></div>
      <div class="video-card__body"><span class="pill">YouTube Tutorial</span><h3>${video[0]}</h3><p>${video[1]}</p></div>
    </article>
  `).join("");
}

function renderQuiz() {
  const q = quizQuestions[quizIndex];
  answered = false;
  byId("quizStep").textContent = `Вопрос ${quizIndex + 1} / ${quizQuestions.length}`;
  byId("quizDifficulty").textContent = q[3];
  byId("quizQuestion").textContent = q[0];
  byId("quizProgressBar").style.width = `${(quizIndex / quizQuestions.length) * 100}%`;
  byId("quizOptions").innerHTML = q[2].map((option) => `<button class="quiz-option" type="button">${option}</button>`).join("");
  byId("quizResult").classList.remove("is-visible");
}

function finishQuiz() {
  const percent = Math.round((quizScore / quizQuestions.length) * 100);
  const level = percent >= 90 ? "Junior UE5 Developer" : percent >= 70 ? "Уверенный ученик" : percent >= 50 ? "Нужна практика" : "Начальный уровень";
  byId("quizProgressBar").style.width = "100%";
  byId("quizQuestion").textContent = "Тест завершен";
  byId("quizOptions").innerHTML = "";
  byId("quizResult").innerHTML = `<h3>${level}</h3><p>Правильных ответов: <strong>${quizScore} из ${quizQuestions.length}</strong>. Процент: <strong>${percent}%</strong>.</p><p>Рекомендация: ${percent >= 70 ? "переходите к финальному мини-проекту и собирайте портфолио." : "повторите лекции по Blueprint, физике и UI, затем пройдите тест снова."}</p>`;
  byId("quizResult").classList.add("is-visible");
}

function initInteractions() {
  document.addEventListener("click", (event) => {
    const lessonButton = event.target.closest("[data-lesson]");
    if (lessonButton) {
      const lesson = lessons.find((item) => item.id === lessonButton.dataset.lesson);
      openModal(lesson.title, lessonModal(lesson));
    }
    const practiceButton = event.target.closest("[data-practice-open]");
    if (practiceButton) {
      const index = Number(practiceButton.dataset.practiceOpen);
      openModal(`Практика ${index + 1}: ${practices[index][0]}`, practiceModal(practices[index], index));
    }
    const galleryCard = event.target.closest("[data-gallery]");
    if (galleryCard) {
      const item = galleryItems[Number(galleryCard.dataset.gallery)];
      openModal(item[1], `<div class="course-modal"><div class="lightbox-media project-shot ${item[3]}"></div><h4>${item[0]}</h4><p>${item[2]}</p><p class="info-box">Fullscreen preview имитирует просмотр ассета или сцены внутри Unreal Engine.</p></div>`);
    }
    const videoCard = event.target.closest("[data-video]");
    if (videoCard) {
      const video = videos[Number(videoCard.dataset.video)];
      openModal(video[0], `<iframe class="video-frame" src="${video[2]}" title="${video[0]}" allowfullscreen></iframe><p>${video[1]}</p>`);
    }
    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("is-active"));
      filterButton.classList.add("is-active");
      renderGallery(filterButton.dataset.filter);
    }
    if (event.target.matches(".quiz-option") && !answered) {
      answered = true;
      const correct = quizQuestions[quizIndex][1];
      document.querySelectorAll(".quiz-option").forEach((option) => {
        option.disabled = true;
        if (option.textContent === correct) option.classList.add("is-correct");
      });
      if (event.target.textContent === correct) {
        quizScore += 1;
        event.target.classList.add("is-correct");
      } else {
        event.target.classList.add("is-wrong");
      }
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("[data-check]")) updatePracticeProgress();
  });

  byId("quizNext").addEventListener("click", () => {
    if (!answered) return;
    quizIndex += 1;
    if (quizIndex >= quizQuestions.length) finishQuiz();
    else renderQuiz();
  });

  byId("quizRestart").addEventListener("click", () => {
    quizIndex = 0;
    quizScore = 0;
    renderQuiz();
  });
}

function initBaseUi() {
  window.addEventListener("load", () => setTimeout(() => loader.classList.add("is-hidden"), 450));
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  document.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }));
  window.addEventListener("scroll", updateScrollUi, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
  document.querySelector(".contact-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    const originalText = button.textContent;
    button.textContent = "Заявка отправлена";
    setTimeout(() => { button.textContent = originalText; event.currentTarget.reset(); }, 1800);
  });
}

function updateScrollUi() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
  toTop.classList.toggle("is-visible", window.scrollY > 650);
}

function initReveal() {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
}

function initCursor() {
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });
  function animateCursorRing() {
    const currentLeft = parseFloat(cursorRing.style.left || mouseX);
    const currentTop = parseFloat(cursorRing.style.top || mouseY);
    cursorRing.style.left = `${currentLeft + (mouseX - currentLeft) * 0.18}px`;
    cursorRing.style.top = `${currentTop + (mouseY - currentTop) * 0.18}px`;
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();
  document.querySelectorAll("a,button,input,summary").forEach((item) => {
    item.addEventListener("mouseenter", () => cursorRing.classList.add("is-hover"));
    item.addEventListener("mouseleave", () => cursorRing.classList.remove("is-hover"));
  });
  document.addEventListener("mousemove", (event) => {
    document.querySelectorAll(".parallax-card").forEach((card) => {
      const depth = Number(card.dataset.depth || 0.04);
      card.style.transform = `translate3d(${(event.clientX - window.innerWidth / 2) * depth}px,${(event.clientY - window.innerHeight / 2) * depth}px,0)`;
    });
  });
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const density = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = rect.width * density;
  canvas.height = rect.height * density;
  ctx.setTransform(density, 0, 0, density, 0, 0);
  particles = Array.from({ length: Math.min(90, Math.floor(rect.width / 14)) }, () => ({ x: Math.random() * rect.width, y: Math.random() * rect.height, vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45, size: Math.random() * 2 + 0.8 }));
}

function drawParticles() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,229,255,.72)";
    ctx.fill();
    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance < 110) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(139,92,246,${1 - distance / 110})`;
        ctx.lineWidth = 0.45;
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(drawParticles);
}

renderLessons();
renderPractices();
renderGalleryFilters();
renderGallery();
renderVideos();
renderQuiz();
initBaseUi();
initInteractions();
initReveal();
initCursor();
resizeCanvas();
drawParticles();
updatePracticeProgress();
updateScrollUi();
window.addEventListener("resize", resizeCanvas);
