export const mock = [
    {
        "sender": {
            "name": "service 3",
            "id": "57ad9374b4c0c9d314716cdc",
            "created_by": "57a30a33f2a3260f3f640dc2"
        },
        "request": {
            "traceId": "3eb5cad5c5d38604",
            "duration": 99209,
            "timeSR": 1470994056729.974,
            "timeCS": 1470994056727.413,
            "requestId": "603b2b642c6e1ca7",
            "name": "role:service4"
        },
        "receiver": {
            "name": "service 4",
            "id": "57ad9377b4c0c9d314716cdd",
            "created_by": "57a30a33f2a3260f3f640dc2"
        },
        "response": {
            "traceId": "3eb5cad5c5d38604",
            "duration": 102836,
            "timeCR": 1470994056830.249,
            "timeSS": 1470994056829.183,
            "requestId": "603b2b642c6e1ca7",
            "name": "{role:service4}",
            "parentId": "8906b542b7e037ef"
        }
    },
    {
        "sender": {
            "name": "service",
            "id": "57ad933bb4c0c9d314716cda",
            "created_by": "57a30a33f2a3260f3f640dc2"
        },
        "request": {
            "traceId": "3eb5cad5c5d38604",
            "duration": 100558,
            "timeSR": 1470994056612.762,
            "timeCS": 1470994056610.461,
            "requestId": "7ec7eaf138cb4698",
            "name": "role:service2"
        },
        "receiver": {
            "name": "service 2",
            "id": "57ad9362b4c0c9d314716cdb",
            "created_by": "57a30a33f2a3260f3f640dc2"
        },
        "response": {
            "traceId": "3eb5cad5c5d38604",
            "duration": 104242,
            "timeCR": 1470994056714.703,
            "timeSS": 1470994056713.32,
            "requestId": "7ec7eaf138cb4698",
            "name": "{role:service2}",
            "parentId": "3eb5cad5c5d38604"
        }
    },
    {
        "sender": {
            "name": "service",
            "id": "57ad933bb4c0c9d314716cda",
            "created_by": "57a30a33f2a3260f3f640dc2"
        },
        "request": {
            "traceId": "3eb5cad5c5d38604",
            "duration": 103223,
            "timeSR": 1470994056727.336,
            "timeCS": 1470994056714.762,
            "requestId": "8906b542b7e037ef",
            "name": "role:service3"
        },
        "receiver": {
            "name": "service 3",
            "id": "57ad9374b4c0c9d314716cdc",
            "created_by": "57a30a33f2a3260f3f640dc2"
        },
        "response": {
            "timeCR": 1470994056831.939,
            "traceId": "3eb5cad5c5d38604",
            "duration": 117177,
            "timeSS": 1470994056830.559,
            "requestId": "8906b542b7e037ef",
            "name": "role:service3,cmd:somethingreallyelse",
            "parentId": "3eb5cad5c5d38604"
        }
    },
    {
        "sender": {
            "system_id": "57a319a4d583d10f3f079c6e",
            "name": "Unregistered Client",
            "id": "unknownClient57a319a4d583d10f3f079c6e",
            "created_by": "57a30a33f2a3260f3f640dc2"
        },
        "request": {
            "traceId": "3eb5cad5c5d38604",
            "duration": 222125,
            "timeSR": 1470994056609.895,
            "timeSS": 1470994056832.02,
            "requestId": "3eb5cad5c5d38604",
            "name": "role:service"
        },
        "receiver": {
            "name": "service",
            "id": "57ad933bb4c0c9d314716cda",
            "created_by": "57a30a33f2a3260f3f640dc2"
        },
        "response": {
            "traceId": "3eb5cad5c5d38604",
            "duration": 222125,
            "timeSR": 1470994056609.895,
            "timeSS": 1470994056832.02,
            "requestId": "3eb5cad5c5d38604",
            "name": "role:service"
        }
    }
];

export const mock2 = [{
    "sender": {
        "system_id": "57a319a4d583d10f3f079c6e",
        "name": "Unregistered Client",
        "id": "unknownClient57a319a4d583d10f3f079c6e",
        "created_by": "57a30a33f2a3260f3f640dc2"
    },
    "request": {
        "traceId": "3eb5cad5c5d38604",
        "duration": 222125,
        "timeSR": 1470994056609.895,
        "timeSS": 1470994056832.02,
        "requestId": "3eb5cad5c5d38604",
        "name": "role:service"
    },
    "receiver": {
        "name": "service",
        "id": "57ad933bb4c0c9d314716cda",
        "created_by": "57a30a33f2a3260f3f640dc2"
    },

}];