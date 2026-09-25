// Generated from design system.md. Do not edit directly.
export const config = {
  "brand": "LionHour",
  "title": "LionHour — Campus hours & menus",
  "description": "Explore Columbia campus hours and dining menus in the LionHour mobile prototype.",
  "favicon": "/assets/2ba3e.svg",
  "dateLabel": "Sunday, September 6, 12:11 AM ET",
  "dateISO": "2026-09-06T00:11:00-04:00",
  "statusbarTime": "9:41",
  "todayIndex": 0,
  "defaultCategory": "dining",
  "defaultView": "hours",
  "defaultFilter": "all",
  "defaultMeal": "breakfast",
  "categories": [
    {
      "id": "dining",
      "label": "Dining",
      "title": "Dining Halls",
      "icon": "restaurant",
      "voting": true,
      "menus": true
    },
    {
      "id": "libraries",
      "label": "Libraries",
      "title": "Libraries",
      "icon": "menu_book",
      "voting": false,
      "menus": false
    },
    {
      "id": "cafes",
      "label": "Cafes",
      "title": "Cafes",
      "icon": "local_cafe",
      "voting": false,
      "menus": false
    },
    {
      "id": "fitness",
      "label": "Fitness",
      "title": "Fitness",
      "icon": "fitness_center",
      "voting": false,
      "menus": false
    },
    {
      "id": "services",
      "label": "Services",
      "title": "Services",
      "icon": "settings",
      "voting": false,
      "menus": false
    }
  ],
  "filters": [
    {
      "id": "all",
      "label": "All",
      "statuses": [
        "open",
        "closing",
        "closed"
      ]
    },
    {
      "id": "open",
      "label": "Open Now",
      "statuses": [
        "open",
        "closing"
      ]
    },
    {
      "id": "closing",
      "label": "Closing Soon",
      "statuses": [
        "closing"
      ]
    },
    {
      "id": "closed",
      "label": "Closed",
      "statuses": [
        "closed"
      ]
    }
  ],
  "statuses": {
    "open": {
      "label": "Open"
    },
    "closing": {
      "label": "Closing soon"
    },
    "closed": {
      "label": "Closed"
    }
  },
  "views": [
    {
      "id": "hours",
      "label": "Hours"
    },
    {
      "id": "menu",
      "label": "Menu"
    }
  ],
  "meals": [
    {
      "id": "breakfast",
      "label": "Breakfast"
    },
    {
      "id": "lunch",
      "label": "Lunch"
    },
    {
      "id": "dinner",
      "label": "Dinner"
    },
    {
      "id": "late-night",
      "label": "Late Night"
    }
  ],
  "days": [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  "icons": {
    "filterArrow": "expand_more",
    "rowArrow": "expand_more",
    "expandedArrow": "expand_less",
    "signal": "signal_cellular_alt",
    "wifi": "wifi",
    "battery": "battery_full"
  },
  "copy": {
    "navigation": "Campus categories",
    "statusFilter": "Filter buildings by status",
    "viewLabel": "Dining view",
    "meal": "Meal",
    "vote": "Vote",
    "voted": "Voted",
    "voteFor": "Vote for {name}",
    "removeVote": "Remove vote for {name}",
    "voteAdded": "Vote saved for {name} for this session.",
    "voteRemoved": "Vote removed for {name}.",
    "scheduleLabel": "Weekly hours for {name}",
    "today": "Today",
    "closed": "Closed",
    "emptyTitle": "No buildings match this filter",
    "emptyDescription": "Choose All to see every building in this category.",
    "resetFilter": "Show all buildings",
    "noMenu": "No menu available for this meal.",
    "results": "{count} buildings shown",
    "prototypeNote": "Prototype · Sample hours and menus",
    "loadError": "LionHour could not load. Please refresh to try again.",
    "noscript": "This prototype needs JavaScript to display campus hours and menus."
  }
};
