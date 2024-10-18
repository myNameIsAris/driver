# UBudget

## Transaction Type Account

### 1. Get All

#### A. Endpoint

```Javascript
GET /ubudget/api/account
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

| Field      | Type                             | Required |
| ---------- | -------------------------------- | :------: |
| pageNumber | Number                           |    No    |
| pageSize   | Number                           |    No    |
| search     | String                           |    No    |
| field      | String (id, code, account, type) |    No    |
| order      | String (asc, desc)               |    No    |

#### C. Request and Response

```Javascript
GET /ubudget/api/account
```

### 2. Get By Id

#### A. Endpoint

```Javascript
GET /ubudget/api/account/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
GET /ubudget/api/account/1
```

### 3. Get Budget Items By Id

#### A. Endpoint

```Javascript
GET /ubudget/api/account/:id/budget-items
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
GET /ubudget/api/account/1budget-items
```

### 4. Create

#### A. Endpoint

```Javascript
POST /ubudget/api/account
```

#### B. Body, Params, and Query

##### Body

| Field   | Type                 | Required |
| ------- | -------------------- | :------: |
| account | String               |   Yes    |
| code    | String               |   Yes    |
| type    | String (Opex, Capex) |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/account

{
    "code" : "04",
    "account" : "Repair & Maintenence",
    "type" : "Opex"
}
```

### 5. Update

#### A. Endpoint

```Javascript
PUT /ubudget/api/account/:id
```

#### B. Body, Params, and Query

##### Body

| Field   | Type                 | Required |
| ------- | -------------------- | :------: |
| account | String               |   Yes    |
| code    | String               |   Yes    |
| type    | String (Opex, Capex) |   Yes    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
PUT /ubudget/api/account/1
{
    "code" : "04",
    "account" : "Repair & Maintenence",
    "type" : "Opex"
}
```

### 6. Delete

#### A. Endpoint

```Javascript
DELETE /ubudget/api/account/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
DELETE /ubudget/api/account/3
```

### 7. Get Opex

#### A. Endpoint

```Javascript
GET /ubudget/api/account/type/opex
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

None

#### C. Request and Response

```Javascript
GET /ubudget/api/account/opex
```

### 8. Get Capex

#### A. Endpoint

```Javascript
GET /ubudget/api/account/type/capex
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

None

#### C. Request and Response

```Javascript
GET /ubudget/api/account/capex
```

## Transaction Budget Item

### 1. Get All

#### A. Endpoint

```Javascript
GET /ubudget/api/budget-item
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

| Field      | Type                                          | Required |
| ---------- | --------------------------------------------- | :------: |
| pageNumber | Number                                        |    No    |
| pageSize   | Number                                        |    No    |
| search     | String                                        |    No    |
| field      | String (id, item, budget_item, code, account) |    No    |
| order      | String (asc, desc)                            |    No    |

#### C. Request and Response

```Javascript
GET /ubudget/api/budget-item
```

### 2. Get By Id

#### A. Endpoint

```Javascript
GET /ubudget/api/budget-item/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
GET /ubudget/api/budget-item/1
```

### 3. Create

#### A. Endpoint

```Javascript
POST /ubudget/api/budget-item
```

#### B. Body, Params, and Query

##### Body

| Field       | Type   | Required |
| ----------- | ------ | :------: |
| item        | String |   Yes    |
| budget_item | String |   Yes    |
| account_id  | Number |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/budget-item
{
    "item" : "02",
    "budget_item" : "Rental Vehicle",
    "account_id" : 2
}
```

### 4. Update

#### A. Endpoint

```Javascript
PUT /ubudget/api/budget-item/:id
```

#### B. Body, Params, and Query

##### Body

| Field       | Type   | Required |
| ----------- | ------ | :------: |
| item        | String |   Yes    |
| budget_item | String |   Yes    |
| account_id  | Number |   Yes    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
PUT /ubudget/api/budget-item/1
{
    "item" : "02",
    "budget_item" : "Rental & Vehicle",
    "account_id" : 2
}
```

### 5. Delete

#### A. Endpoint

```Javascript
DELETE /ubudget/api/budget-item/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
DELETE /ubudget/api/budget-item/3
```

## Opex GL

### 1. Get All

#### A. Endpoint

```Javascript
GET /ubudget/api/opex-gl
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

| Field      | Type                                     | Required |
| ---------- | ---------------------------------------- | :------: |
| pageNumber | Number                                   |    No    |
| pageSize   | Number                                   |    No    |
| search     | String                                   |    No    |
| field      | String (glcode, item, budget_item, fund) |    No    |

#### C. Request and Response

```Javascript
GET /ubudget/api/opex-gl
```

### 2. Get By Id

#### A. Endpoint

```Javascript
GET /ubudget/api/opex-gl/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
GET /ubudget/api/opex-gl/1
```

### 3. Create

#### A. Endpoint

```Javascript
POST /ubudget/api/opex-gl
```

#### B. Body, Params, and Query

##### Body

| Field          | Type   | Required |
| -------------- | ------ | :------: |
| gl_code        | Number |   Yes    |
| budget_item_id | Number |   Yes    |
| fund_id        | Number |    No    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/opex-gl

{
    "gl_code" : 6090070,
    "budget_item_id" : 2,
    "fund_id" : 1
}
```

### 4. Update

#### A. Endpoint

```Javascript
PUT /ubudget/api/opex-gl/:id
```

#### B. Body, Params, and Query

##### Body

| Field          | Type   | Required |
| -------------- | ------ | :------: |
| gl_code        | Number |   Yes    |
| budget_item_id | Number |   Yes    |
| fund_id        | Number |    No    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
PUT /ubudget/api/opex-gl/1

{
    "gl_code" : 6091070,
    "budget_item_id" : 2,
    "fund_id" : 1
}
```

### 5. Delete

#### A. Endpoint

```Javascript
DELETE /ubudget/api/opex-gl/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
DELETE /ubudget/api/opex-gl/3
```

### 6. Get Budget Task By Opex GL

#### A. Endpoint

```Javascript
GET /ubudget/api/opex-gl/:id/budget-task
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
GET /ubudget/api/opex-gl/1/budget-task
```

## Capex GL

### 1. Get All

#### A. Endpoint

```Javascript
GET /ubudget/api/capex-gl
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

| Field      | Type                                 | Required |
| ---------- | ------------------------------------ | :------: |
| pageNumber | Number                               |    No    |
| pageSize   | Number                               |    No    |
| search     | String                               |    No    |
| field      | String (glcode, code, account, fund) |    No    |
| order      | String (asc, desc)                   |    No    |

#### C. Request and Response

```Javascript
GET /ubudget/api/capex-gl
```

### 2. Get By Id

#### A. Endpoint

```Javascript
GET /ubudget/api/capex-gl/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
GET /ubudget/api/capex-gl/1
```

### 3. Create

#### A. Endpoint

```Javascript
POST /ubudget/api/capex-gl
```

#### B. Body, Params, and Query

##### Body

| Field      | Type   | Required |
| ---------- | ------ | :------: |
| gl_code    | Number |   Yes    |
| account_id | Number |   Yes    |
| fund_id    | Number |    No    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/capex-gl

{
    "gl_code" : 6091170,
    "account_id" : 2,
    "fund_id" : 1
}
```

### 4. Update

#### A. Endpoint

```Javascript
PUT /ubudget/api/capex-gl/:id
```

#### B. Body, Params, and Query

##### Body

| Field      | Type   | Required |
| ---------- | ------ | :------: |
| gl_code    | Number |   Yes    |
| account_id | Number |   Yes    |
| fund_id    | Number |    No    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
PUT /ubudget/api/capex-gl/1

{
    "gl_code" : 6091270,
    "account_id" : 2,
    "fund_id" : 1
}
```

### 5. Delete

#### A. Endpoint

```Javascript
DELETE /ubudget/api/capex-gl/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
DELETE /ubudget/api/capex-gl/3
```

### 6. Get Budget Task By Capex GL

#### A. Endpoint

```Javascript
GET /ubudget/api/capex-gl/:id/budget-task
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request and Response

```Javascript
GET /ubudget/api/capex-gl/1/budget-task
```

## FUND CENTER

### 1. Get All

#### A. Endpoint

```Javascript
GET /ubudget/api/fund-center
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

| Field      | Type                                                   | Required |
| ---------- | ------------------------------------------------------ | :------: |
| pageNumber | Number                                                 |    No    |
| pageSize   | Number                                                 |    No    |
| search     | String                                                 |    No    |
| field      | String (department_code, department_name, fund_center) |    No    |

#### C. Request

```Javascript
GET /ubudget/api/fund-center
```

### 2. Get By Id

#### A. Endpoint

```Javascript
GET /ubudget/api/fund-center/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/fund-center/1
```

### 3. Create

#### A. Endpoint

```Javascript
POST /ubudget/api/fund-center
```

#### B. Body, Params, and Query

##### Body

| Field           | Type   | Required |
| --------------- | ------ | :------: |
| department_code | Number |   Yes    |
| department_name | String |   Yes    |
| fund_center     | String |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/fund-center

{
    "department_code" : 122,
    "department_name" : "Finance",
    "fund_center" : "7003.122"
}
```

### 4. Update

#### A. Endpoint

```Javascript
PUT /ubudget/api/fund-center/:id
```

#### B. Body, Params, and Query

##### Body

| Field           | Type   | Required |
| --------------- | ------ | :------: |
| department_code | Number |   Yes    |
| department_name | String |   Yes    |
| fund_center     | String |   Yes    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
PUT /ubudget/api/fund-center/1

{
    "department_code" : 122,
    "department_name" : "Keuangan",
    "fund_center" : "7003.122"
}
```

### 5. Delete

#### A. Endpoint

```Javascript
DELETE /ubudget/api/fund-center/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
DELETE /ubudget/api/fund-center/3
```

## FUND

### 1. Get All

#### A. Endpoint

```Javascript
GET /ubudget/api/fund
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

| Field      | Type                       | Required |
| ---------- | -------------------------- | :------: |
| pageNumber | Number                     |    No    |
| pageSize   | Number                     |    No    |
| search     | String                     |    No    |
| field      | String (fund, fund_center) |    No    |
| order      | String (asc, desc)         |    No    |

#### C. Request

```Javascript
GET /ubudget/api/fund
```

### 2. Get By Id

#### A. Endpoint

```Javascript
GET /ubudget/api/fund/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/fund/1
```

### 3. Create

#### A. Endpoint

```Javascript
POST /ubudget/api/fund
```

#### B. Body, Params, and Query

##### Body

| Field          | Type   | Required |
| -------------- | ------ | :------: |
| fund           | String |   Yes    |
| fund_center_id | Number |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/fund

{
    "fund" : "7003.122.01",
    "fund_center_id" : 2
}
```

### 4. Update

#### A. Endpoint

```Javascript
PUT /ubudget/api/fund/:id
```

#### B. Body, Params, and Query

##### Body

| Field          | Type   | Required |
| -------------- | ------ | :------: |
| fund           | String |   Yes    |
| fund_center_id | Number |   Yes    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
PUT /ubudget/api/fund/1

{
    "fund" : "7003.122.03",
    "fund_center_id" : 2
}
```

### 5. Delete

#### A. Endpoint

```Javascript
DELETE /ubudget/api/fund/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
DELETE /ubudget/api/fund/3
```

## PLAN BUDGET

### 1. Get All

#### A. Endpoint

```Javascript
GET /ubudget/api/plan
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

| Field      | Type                                        | Required |
| ---------- | ------------------------------------------- | :------: |
| pageNumber | Number                                      |    No    |
| pageSize   | Number                                      |    No    |
| search     | String                                      |    No    |
| field      | String (title, description, version, total) |    No    |
| order      | String (asc, desc)                          |    No    |

#### C. Request

```Javascript
GET /ubudget/api/plan
```

### 2. Get By Id

#### A. Endpoint

```Javascript
GET /ubudget/api/plan/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/plan/1
```

### 3. Create

#### A. Endpoint

```Javascript
POST /ubudget/api/plan
```

#### B. Body, Params, and Query

##### Body

| Field          | Type    | Required |
| -------------- | ------- | :------: |
| title          | String  |   Yes    |
| fund_center_id | Number  |   Yes    |
| year           | Number  |   Yes    |
| is_active      | Boolean |   Yes    |
| opex           | Object  |   Yes    |
| capex          | Object  |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/plan

{
    "title" : "Contoh Budget",
    "fund_center_id" : 3,
    "year" : 2023,
    "is_active" : true,
    "opex" : [
        {
         "account_id": 1,
         "item" : [
            {
                "budget_item_id": 5,
                "opex_gl_id" : 1,
                "fund_id" : 1,
                "budget" : [
                    {
                        "name" : "Contoh Budget di Opex Item",
                        "description" : "Ini salah satu contoh budget Opex",
                        "jan": 0,
                        "feb": 0,
                        "mar": 0,
                        "apr": 0,
                        "may": 0,
                        "jun": 0,
                        "jul": 10,
                        "aug": 0,
                        "sep": 0,
                        "oct": 0,
                        "nov": 0,
                        "dec": 90,
                        "total": 100
                    }
                ]
            }
         ]
        }
    ],
    "capex" : [
        {
            "account_id": 18,
            "capex_gl_id" : 1,
            "fund_id" : 1,
            "budget" : [
                {
                    "name" : "Contoh Budget di Capex",
                    "description" : "Ini salah satu contoh budget Capex",
                    "jan": 0,
                    "feb": 0,
                    "mar": 0,
                    "apr": 0,
                    "may": 0,
                    "jun": 0,
                    "jul": 10,
                    "aug": 0,
                    "sep": 0,
                    "oct": 0,
                    "nov": 0,
                    "dec": 90,
                    "total": 100
                }
            ]
        }
    ]
}

```

### 4. Update

#### A. Endpoint

```Javascript
PUT /ubudget/api/plan/:id
```

#### B. Body, Params, and Query

##### Body

| Field          | Type    | Required |
| -------------- | ------- | :------: |
| title          | String  |   Yes    |
| is_active      | Boolean |   Yes    |
| fund_center_id | Number  |   Yes    |
| notes          | String  |    No    |
| opex           | Object  |   Yes    |
| capex          | Object  |   Yes    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
PUT /ubudget/api/plan/1

{
    "title" : "Budget Lainnya",
    "fund_center_id" : 1,
    "is_active" : true,
    "notes" : "Ini adalah catatan",
    "opex": [
        {
            "id": "8",
            "plan_id": "3",
            "account_id": "1",
            "item": [
                {
                    "id": "9",
                    "plan_item_opex_id": "8",
                    "budget_item_id": "5",
                    "fund_id": "28",
                    "opex_gl_id": "2",
                    "budget": [
                        {
                            "name": "Contoh Budget di Opex Item Ini",
                            "description": "Ini salah satu contoh budget Opex",
                            "code": "eafa062a-0497-4c91-9da1-b90d34504589",
                            "jan": 0,
                            "feb": 0,
                            "mar": 0,
                            "apr": 0,
                            "may": 0,
                            "jun": 0,
                            "jul": 100,
                            "aug": 0,
                            "sep": 0,
                            "oct": 0,
                            "nov": 0,
                            "dec": 90,
                            "total": 190,
                            "plan_item_capex_id": null,
                            "plan_item_item_opex_id": "9"
                        }
                    ]
                }
            ]
        }
    ],
    "capex": [
        {
            "id": "7",
            "plan_id": "3",
            "capex_gl_id": "1",
            "fund_id": "28",
            "account_id": "18",
            "budget": [
                {
                    "id": "16",
                    "name": "Contoh Budget di Capex",
                    "description": "Ini salah satu contoh budget Capex Bang",
                    "code": "71b29407-b03b-477d-8160-b2f02af45416",
                    "jan": 0,
                    "feb": 0,
                    "mar": 0,
                    "apr": 0,
                    "may": 0,
                    "jun": 0,
                    "jul": 10,
                    "aug": 0,
                    "sep": 0,
                    "oct": 0,
                    "nov": 0,
                    "dec": 90,
                    "total": 100,
                    "plan_item_capex_id": "7",
                    "plan_item_item_opex_id": null
                }
            ]
        }
    ]
}
```

### 5. Delete

#### A. Endpoint

```Javascript
DELETE /ubudget/api/plan/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
DELETE /ubudget/api/plan/3
```

### 6. Create New Version

#### A. Endpoint

```Javascript
POST /ubudget/api/plan/:id/new-version
```

#### B. Body, Params, and Query

##### Body

| Field          | Type    | Required |
| -------------- | ------- | :------: |
| fund_center_id | Number  |   Yes    |
| year           | Number  |   Yes    |
| is_active      | Boolean |   Yes    |
| notes          | String  |    No    |
| opex           | Object  |   Yes    |
| capex          | Object  |   Yes    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
{
    "year" : 2023,
    "fund_center_id" : 1,
    "is_active" : true,
    "notes" : "Ini adalah catatan",
    "opex": [
        {
            "plan_id": "3",
            "account_id": "1",
            "opex_item": [
                {
                    "plan_item_opex_id": "8",
                    "budget_item_id": "5",
                    "fund_id": "28",
                    "opex_gl_id": "2",
                    "budget": [
                        {
                            "name": "Contoh Budget di Opex Item Ini",
                            "description": "Ini salah satu contoh budget Opex",
                            "code": "eafa062a-0497-4c91-9da1-b90d34504589",
                            "jan": 0,
                            "feb": 0,
                            "mar": 0,
                            "apr": 0,
                            "may": 0,
                            "jun": 0,
                            "jul": 100,
                            "aug": 0,
                            "sep": 0,
                            "oct": 0,
                            "nov": 0,
                            "dec": 90,
                            "total": 190,
                            "plan_item_capex_id": null,
                            "plan_item_item_opex_id": "9"
                        }
                    ]
                }
            ]
        }
    ],
    "capex": [
        {
            "plan_id": "3",
            "capex_gl_id": "1",
            "fund_id": "28",
            "account_id": "18",
            "budget": [
                {
                    "name": "Contoh Budget di Capex",
                    "description": "Ini salah satu contoh budget Capex Bang",
                    "code": "71b29407-b03b-477d-8160-b2f02af45416",
                    "jan": 0,
                    "feb": 0,
                    "mar": 0,
                    "apr": 0,
                    "may": 0,
                    "jun": 0,
                    "jul": 10,
                    "aug": 0,
                    "sep": 0,
                    "oct": 0,
                    "nov": 0,
                    "dec": 90,
                    "total": 100,
                    "plan_item_capex_id": "7",
                    "plan_item_item_opex_id": null
                }
            ]
        }
    ]
}
```

### 7. Import Plan With Excel

#### A. Endpoint

```Javascript
POST /ubudget/api/plan/import
```

#### B. Body, Params, and Query

##### Body

| Field          | Type    | Required |
| -------------- | ------- | :------: |
| title          | String  |   Yes    |
| description    | String  |   Yes    |
| fund_center_id | Number  |   Yes    |
| year           | Number  |   Yes    |
| is_active      | Boolean |   Yes    |
| files          | File    |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/plan/import

{
    "fund_center_id" : 1,
    "year" : 2024,
    "is_active" : true,
    "title" : "Contoh Budget",
    "description" : "Ini adalah contoh budget",
    "files" : "EXCEL FILE"
}
```

### 8. Compare Plan

#### A. Endpoint

```Javascript
POST /ubudget/api/plan/compare
```

#### B. Body, Params, and Query

##### Body

| Field    | Type   | Required |
| -------- | ------ | :------: |
| firstId  | Number |   Yes    |
| secondId | Number |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/plan/compare

{
    "firstId" : 1,
    "secondId" : 2
}
```

### 9. Get Data By Plan Compare

#### A. Endpoint

```Javascript
POST /ubudget/api/plan/compare
```

#### B. Body, Params, and Query

##### Body

| Field      | Type                 |      Required       |
| ---------- | -------------------- | :-----------------: |
| firstId    | Number               |         Yes         |
| secondId   | Number               |         Yes         |
| type       | String (opex, capex) |         Yes         |
| account_id | Number               | Yes (For type opex) |
| gl_code    | Array                |         No          |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/plan/compare

{
    // Get Opex TT Account
    "firstId" : 1,
    "secondId" : 2,
    "type" : "opex",

    // Get All GL Code By TT Account ID Opex
    "firstId" : 1,
    "secondId" : 2,
    "type" : "opex",
    "account_id" : 1,

    // Get Compare Data By GL Code Opex
    "firstId" : 1,
    "secondId" : 2,
    "type" : "opex",
    "account_id" : 1,
    "gl_code" : ["6120021", "6120022"]



    // Get GL Code From Capex
    "firstId" : 1,
    "secondId" : 2,
    "type" : "capex"

    // Get Compare Data By GL Code
    "firstId" : 1,
    "secondId" : 2,
    "type" : "capex",
    "gl_code" : ["1600900", "1600800"]

}
```

### 10. Create Relocate Plan

#### A. Endpoint

```Javascript
// INT-EKS, INT-INT
POST /ubudget/api/plan/relocate
```

```Javascript
// EKS-INT
POST /ubudget/api/plan/relocate-eks-int
```

#### B. Body, Params, and Query

##### Body

| Field | Type  | Required |
| ----- | ----- | :------: |
| datas | Array |   Yes    |

Array of Object Datas

| Field          | Type   |           Required           |
| -------------- | ------ | :--------------------------: |
| id             | Number |              No              |
| code           | String |             Yes              |
| fund_center_id | Number |             Yes              |
| fund_id        | Number |             Yes              |
| opex_gl_id     | Number | Yes (If capex_gl_id is null) |
| capex_gl_id    | Number | Yes (If opex_gl_id is null)  |
| budget_task    | String |             Yes              |
| delivery_date  | Date   |             Yes              |
| relocate_value | Number |             Yes              |
| im_number_id   | Number |              No              |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/plan/relocate

{
    // INT-EKS, EKS-INT
    "datas" : [
        {
            "code" : "6120021",
            "fund_center_id" : 1,
            "fund_id" : 1,
            "opex_gl_id" : 1,
            "budget_task" : "Relocate Budget",
            "delivery_date" : "2023-01-01",
            "relocate_value" : 100000,
            "im_number_id" : 1
        }
    ]

    // INT-INT,
    "datas" : [
        {
            "code" : "6120021", // Code plan budget from
            "fund_center_id" : 1,
            "fund_id" : 1,
            "opex_gl_id" : 1,
            "budget_task" : "6120022", //  Code plan budget to
            "delivery_date" : "2023-01-01",
            "relocate_value" : 100000,
            "im_number_id" : 1
        }
    ]
}
```

### 12. Delete Relocate Plan

#### A. Endpoint

```Javascript
DELETE /ubudget/api/plan/relocate/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
DELETE /ubudget/api/plan/relocate/3
```

### 13. Create IM Number File

#### A. Endpoint

```Javascript
POST /ubudget/api/plan/relocate/im_file/:id
```

#### B. Body, Params, and Query

##### Body

| Field | Type | Required |
| ----- | ---- | :------: |
| file  | File |   Yes    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/plan/relocate/im_file/1
```

### 14. Get IM Number File

#### A. Endpoint

```Javascript
GET /ubudget/document/:fileName
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field    | Type   | Required |
| -------- | ------ | :------: |
| fileName | String |   Yes    |

##### Query

None

#### C. Request

```Javascript
GET /ubudget/document/IM-12345678.pdf
```

### 15. Remove IM Number File

#### A. Endpoint

```Javascript
DELETE /ubudget/api/plan/relocate/im_file/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

| Field    | Type   | Required |
| -------- | ------ | :------: |
| fileName | String |   Yes    |

#### C. Request

```Javascript
// For Delate a File
DELETE /ubudget/api/plan/relocate/im_file/1?fileName=IM-12345678.pdf

// For Delate All File
DELETE /ubudget/api/plan/relocate/im_file/1?fileName=
```

## MONITORING

### 1. Get All Monitoring

#### A. Endpoint

```Javascript
GET /ubudget/api/monitoring
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/monitoring
```

### 2. Get Monitoring Opex TT Account

#### A. Endpoint

```Javascript
GET /ubudget/api/monitoring/opex
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/monitoring/opex
```

### 3. Get Monitoring Opex GL Code By TT Account ID

#### A. Endpoint

```Javascript
GET /ubudget/api/monitoring/opex/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/monitoring/opex/1
```

### 4. Get Monitoring Capex GL Code

#### A. Endpoint

```Javascript
GET /ubudget/api/monitoring/capex
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/monitoring/capex
```

### 5. Get Monitoring Data By GL Code

#### A. Endpoint

```Javascript
POST /ubudget/api/monitoring/gl_code
```

#### B. Body, Params, and Query

##### Body

| Field      | Type                 |       Required        |
| ---------- | -------------------- | :-------------------: |
| type       | String (opex, capex) |          Yes          |
| account_id | Number               | No (Yes if type opex) |
| gl_code    | Array                |          Yes          |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/monitoring/gl_code

{
    "type" : "opex",
    "gl_code" : ["6120021", "6120022"]
}
```

### 6. Get Monitoring Data By Type and GLCODE

#### A. Endpoint

```Javascript
GET /ubudget/api/monitoring/gl_code/:type/:gl_code
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field   | Type                 | Required |
| ------- | -------------------- | :------: |
| type    | String (opex, capex) |   Yes    |
| gl_code | String               |   Yes    |

##### Query

| Field | Type                                                                                                                                                                                                                                     | Required |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
| field | String (name, total, remaining_budget, po_value, pr_subject, pr_date, po_subject, po_date, bast_subject, bast_date, ses_gr_no_subject, inv_subject, vendor_name, dpp, vat, after_tax, wht, net_value, fa_form, doc_to_fa, payment_date,) |    No    |
| order | String (asc, desc)                                                                                                                                                                                                                       |    No    |

#### C. Request

```Javascript
GET /ubudget/api/monitoring/gl_code/opex/6120021
```

### 7. Get Compare Active Plan and Actual

#### A. Endpoint

```Javascript
POST /ubudget/api/compare-actual
```

#### B. Body, Params, and Query

##### Body

| Field      | Type                 |      Required       |
| ---------- | -------------------- | :-----------------: |
| type       | String (opex, capex) |         Yes         |
| account_id | Number               | Yes (For type opex) |
| gl_code    | Array                |         No          |

##### Params

None

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/compare-actual

{
    // Get Opex TT Account
    "type" : "opex",

    // Get All GL Code By TT Account ID Opex
    "type" : "opex",
    "account_id" : 1,

    // Get Compare Data By GL Code Opex
    "type" : "opex",
    "account_id" : 1,
    "gl_code" : ["6120021", "6120022"]



    // Get GL Code From Capex
    "type" : "capex"

    // Get Compare Data By GL Code
    "type" : "capex",
    "gl_code" : ["1600900", "1600800"]

}
```

## ACTUAL BUDGET

### 1. Save

#### A. Endpoint

```Javascript
POST /ubudget/api/actual
```

#### B. Body, Params, and Query

##### Body

| Field | Type  | Required |
| ----- | ----- | :------: |
| datas | Array |   Yes    |

Array of Object Datas

| Field            | Type   | Required |
| ---------------- | ------ | :------: |
| id               | Number |    No    |
| code_plan_budget | String |   Yes    |
| po_value         | Number |   Yes    |
| po_name          | String |    No    |
| pr_value         | Number |    No    |
| pr_date          | Date   |    No    |
| po_subject       | String |    No    |
| po_date          | Date   |    No    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/actual

{
    "datas" : [
        {
            "code_plan_budget" : "7e432c9e-3527-4106-87a9-40a18534d503",
            "po_value" : 1000000,
        }
    ]
}
```

### 2. Remove By ID

#### A. Endpoint

```Javascript
DELETE /ubudget/api/actual/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
DELETE /ubudget/api/actual/1
```

### 3. Closed Actual Budget

#### A. Endpoint

```Javascript
POST /ubudget/api/actual/closed/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/actual/closed/1
```

### 4. Save Actual Budget Items

#### A. Endpoint

```Javascript
POST /ubudget/api/actual-items
```

#### B. Body, Params, and Query

##### Body

| Field | Type  | Required |
| ----- | ----- | :------: |
| datas | Array |   Yes    |

Array of Object Datas

| Field              | Type   | Required |
| ------------------ | ------ | :------: |
| id                 | Number |    No    |
| code_actual_budget | String |   Yes    |
| bast_subject       | String |    No    |
| bast_date          | Date   |    No    |
| ses_gr_no_subject  | String |    No    |
| inv_subject        | String |    No    |
| vendor_name        | String |    No    |
| dpp                | Number |    No    |
| vat                | Number |    No    |
| after_tax          | Number |    No    |
| wht                | Number |    No    |
| net_value          | Number |    No    |
| fa_form_no         | Date   |    No    |
| doc_to_fa          | Date   |    No    |
| payment_date       | Date   |    No    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/actual-items

{
    "datas" : [
        {
            "code_actual_budget" : "7e432c9e-3527-4106-87a9-40a18534d503",
            "bast_subject" : "BAST",
            "bast_date" : "2023-01-01",
            "ses_gr_no_subject" : "SES GR NO",
            "inv_subject" : "INV",
            "vendor_name" : "Vendor",
            "dpp" : 1000000,
            "vat" : 100000,
            "after_tax" : 1100000,
            "wht" : 100000,
            "net_value" : 1000000,
            "fa_form_no" : "2023-01-01",
            "doc_to_fa" : "2023-01-01",
            "payment_date" : "2023-01-01"
        }
    ]
}
```

### 5. Remove Actual Budget Items By ID

#### A. Endpoint

```Javascript
DELETE /ubudget/api/actual-items/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
DELETE /ubudget/api/actual-items/1
```

## FORMULA

### 1. Get All

#### A. Endpoint

```Javascript
GET /ubudget/api/formula
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/formula
```

### 2. Update By Id

#### A. Endpoint

```Javascript
PUT /ubudget/api/formula/:id
```

#### B. Body, Params, and Query

##### Body

| Field      | Type   | Required |
| ---------- | ------ | :------: |
| field      | String |   Yes    |
| percentage | Number |   Yes    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
PUT /ubudget/api/formula/1

{
    "field" : "wht",
    "percentage" : 12.00
}
```

## ROLE MANAGEMENT

### 1. Get All

#### A. Endpoint

```Javascript
GET /ubudget/api/role-mapping
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

| Field    | Description                           |        Type         |
| -------- | ------------------------------------- | :-----------------: |
| page     | Number Page for Contract              |         Int         |
| pageSize | Page Size Every Page of Contract      |         Int         |
| search   | Search a value in Contract Field      |       String        |
| field    | What Field to Order (Default ID)      | String (name, role) |
| order    | What Order to Show Data (Default asc) | String (asc, desc)  |

#### C. Request

```Javascript
GET /ubudget/api/role-mapping
```

### 2. Create Role User

#### A. Endpoint

```Javascript
POST /ubudget/api/role-mapping/create
```

#### B. Body, Params, and Query

##### Body

| Field   | Type   | Required |
| ------- | ------ | :------: |
| nik     | String |   Yes    |
| role_id | String |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/role-mapping/create

{
    "nik" : "123456",
    "role_id" : "1"
}
```

### 3. Update Role User

#### A. Endpoint

```Javascript
PUT /ubudget/api/role-mapping/update
```

#### B. Body, Params, and Query

##### Body

| Field   | Type   | Required |
| ------- | ------ | :------: |
| role_id | String |   Yes    |

##### Params

None

##### Query

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

#### C. Request

```Javascript
PUT /ubudget/api/role-mapping/update

{
    "role_id" : "2"
}
```

### 4. Delete Role User

#### A. Endpoint

```Javascript
DELETE /ubudget/api/role-mapping/:id/delete
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
DELETE /ubudget/api/role-mapping/1/delete
```

## VENDOR

### 1. Get All

#### A. Endpoint

```Javascript
GET /ubudget/api/vendor
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/vendor
```

## REPORT

### 1. Get Opex Data

#### A. Endpoint

```Javascript
POST /ubudget/api/report/opex
```

#### B. Body, Params, and Query

##### Body

| Field            | Type                           | Required |
| ---------------- | ------------------------------ | :------: |
| transaction_type | Array (ID of Transaction Type) |    No    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
//  Get All Transaction Type
POST /ubudget/api/report/opex

// Get All Gl By Transaction Type
POST /ubudget/api/report/opex

{
    "transaction_type" : [1, 2]
}

```

### 2. Get Capex Data

#### A. Endpoint

```Javascript
POST /ubudget/api/report/capex
```

#### B. Body, Params, and Query

##### Body

| Field            | Type                           | Required |
| ---------------- | ------------------------------ | :------: |
| transaction_type | Array (ID of Transaction Type) |    No    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
//  Get All Transaction Type
POST /ubudget/api/report/capex

// Get All Gl By Transaction Type
POST /ubudget/api/report/capex

{
    "transaction_type" : [1, 2]
}

```

### 3. Get Report Budget

#### A. Endpoint

```Javascript
POST /ubudget/api/report-budget-plan
```

#### B. Body, Params, and Query

##### Body

| Field            | Type                           | Required |
| ---------------- | ------------------------------ | :------: |
| type             | String                         |    No    |
| transaction_type | Array (ID of Transaction Type) |    No    |
| gl_code          | Array (ID of GL Code)          |    No    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
//  Get All Budget Plan
POST /ubudget/api/report-budget-plan

// Get All Budget Plan By Transaction Type
POST /ubudget/api/report-budget-plan

{
    "type" : "opex",
    "transaction_type" : [1, 2]
}

// Get All Budget Plan By GL Code
POST /ubudget/api/report-budget-plan

{
    "type" : "opex",
    "transaction_type" : [1, 2]
    "gl_code" : [611089]
}

```

### 4. Get Report Budget Actual

#### A. Endpoint

```Javascript
POST /ubudget/api/report-actual-expenses
```

#### B. Body, Params, and Query

##### Body

| Field            | Type                           | Required |
| ---------------- | ------------------------------ | :------: |
| type             | String                         |    No    |
| transaction_type | Array (ID of Transaction Type) |    No    |
| gl_code          | Array (ID of GL Code)          |    No    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
//  Get All Budget Actual
POST /ubudget/api/report-actual-expenses

// Get All Budget Actual By Transaction Type
POST /ubudget/api/report-actual-expenses

{
    "type" : "opex",
    "transaction_type" : [1, 2]
}

// Get All Budget Actual By GL Code
POST /ubudget/api/report-actual-expenses

{
    "type" : "opex",
    "transaction_type" : [1, 2]
    "gl_code" : [611089]
}

```

### 5. Get Report Relocate Plan

#### A. Endpoint

```Javascript
POST /ubudget/api/report-relocate-plan
```

#### B. Body, Params, and Query

##### Body

| Field            | Type                                               | Required |
| ---------------- | -------------------------------------------------- | :------: |
| type             | String                                             |    No    |
| transaction_type | Array (ID of Transaction Type)                     |    No    |
| gl_code          | Array (ID of GL Code)                              |    No    |
| transaction_type | Array (INT-EKS, INT-INT-FROM, INT-INT-TO, EKS-INT) |    No    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
//  Get All Relocate Plan
POST /ubudget/api/report-relocate-plan

// Get All Relocate Plan By Transaction Type
POST /ubudget/api/report-relocate-plan

{
    "type" : "opex",
    "transaction_type" : [1, 2]
}

// Get All Relocate Plan By GL Code
POST /ubudget/api/report-relocate-plan

{
    "type" : "opex",
    "transaction_type" : [1, 2]
    "gl_code" : [611089]
}
```

### 6. Get Actual Budget by Plan Budget

#### A. Endpoint

```Javascript
POST /ubudget/api/actual/:code
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type                         | Required |
| ----- | ---------------------------- | :------: |
| code  | String (code of plan budget) |   Yes    |

##### Query

| Field  | Type   | Required |
| ------ | ------ | :------: |
| search | String |   Yes    |

#### C. Request

```Javascript
POST /ubudget/api/actual/7e432c9e-3527-4106-87a9-40a18534d503
```

## ACCESS

### 1. Get Access By Entity

#### A. Endpoint

```Javascript
GET /ubudget/api/access/:entity_type/:entity_id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field     | Type                                          | Required |
| --------- | --------------------------------------------- | :------: |
| entity    | String (plan_item_item_opex, plan_item_capex) |   Yes    |
| entity_id | Number                                        |   Yes    |

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/access/plan_item_item_opex/1
```

### 2. Create Access

#### A. Endpoint

```Javascript
POST /ubudget/api/access
```

#### B. Body, Params, and Query

##### Body

| Field     | Type                                                            | Required |
| --------- | --------------------------------------------------------------- | :------: |
| entity    | String (plan_item_item_opex, plan_item_capex, plan_budget_item) |   Yes    |
| entity_id | Number                                                          |   Yes    |
| user_id   | Number                                                          |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/access

{
    "entity" : "plan_item_item_opex",
    "entity_id" : 1,
    "user_id" : 1
}
```

### 3. Delete Access

#### A. Endpoint

```Javascript
DELETE /ubudget/api/access/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
DELETE /ubudget/api/access/1
```

## IM NUMBER

### 1. Get All IM Number

#### A. Endpoint

```Javascript
GET /ubudget/api/im-number
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/im-number
```

### 2. Get IM Number By ID

#### A. Endpoint

```Javascript
GET /ubudget/api/im-number/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/im-number/1
```

### 3. Create IM Number

#### A. Endpoint

```Javascript
POST /ubudget/api/im-number
```

#### B. Body, Params, and Query

##### Body

| Field     | Type   | Required |
| --------- | ------ | :------: |
| im_number | String |   Yes    |
| name      | String |   Yes    |
| files     | File   |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/im-number

{
    "im_number" : "IM-12345678",
    "name" : "IM-12345678",
    "files" : "EXCEL FILE"
}
```

### 4. Update IM Number

#### A. Endpoint

```Javascript
PUT /ubudget/api/im-number/:id
```

#### B. Body, Params, and Query

##### Body

| Field     | Type   | Required |
| --------- | ------ | :------: |
| im_number | String |   Yes    |
| name      | String |   Yes    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
PUT /ubudget/api/im-number/1

{
    "im_number" : "IM-12345678",
    "name" : "IM-12345678"
}
```

### 5. Delete IM Number

#### A. Endpoint

```Javascript
DELETE /ubudget/api/im-number/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
DELETE /ubudget/api/im-number/1
```

### 6. Add IM Number File

#### A. Endpoint

```Javascript
POST /ubudget/api/im-number/im-file/:id
```

#### B. Body, Params, and Query

##### Body

| Field | Type | Required |
| ----- | ---- | :------: |
| files | File |   Yes    |

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/im-number/im-file/1

{
    "files" : "EXCEL FILE"
}
```

### 7. Remove IM Number File

#### A. Endpoint

```Javascript
DELETE /ubudget/api/im-number/im-file/:id
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field | Type   | Required |
| ----- | ------ | :------: |
| id    | Number |   Yes    |

##### Query

| Field      | Type   | Required |
| ---------- | ------ | :------: |
| attachment | String |   Yes    |

#### C. Request

```Javascript
// For Delete a File
DELETE /ubudget/api/im-number/im-file/1?attachment=IM-12345678

// For Delete All File
DELETE /ubudget/api/im-number/im-file/1?attachment=
```

## UTILITY

### 1. Get All PO Number

#### A. Endpoint

```Javascript
GET /ubudget/api/po-number
```

#### B. Body, Params, and Query

##### Body

None

##### Params

None

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/po-number
```

### 2. Get Actual By PO Number

#### A. Endpoint

```Javascript
POST /ubudget/api/po-number
```

#### B. Body, Params, and Query

##### Body

| Field     | Type  | Required |
| --------- | ----- | :------: |
| po_number | Array |   Yes    |

##### Params

None

##### Query

None

#### C. Request

```Javascript
POST /ubudget/api/po-number

{
    "po_number" : ["123456789", "987654321"]
}
```

### 3. Calculate Net Value

#### A. Endpoint

```Javascript
POST /ubudget/api/calculate-dpp
```

#### B. Body, Params, and Query

##### Body

| Field | Type             | Required |
| ----- | ---------------- | :------: |
| dpp   | Number or String |   Yes    |
| wht   | Number or String |    No    |
| vat   | Number or String |    No    |

##### Params

None

##### Query

None

#### C. Request

```Javascript

// Calculate For Automatic WHT
POST /ubudget/api/calculate-dpp
{
    "dpp" : 1000000,
}

// Calculate For Manual WHT
POST /ubudget/api/calculate-dpp
{
    "dpp" : 1000000,
    "wht" : 100000
}

// Calculate For Manual WHT and VAT
POST /ubudget/api/calculate-dpp
{
    "dpp" : 1000000,
    "wht" : 100000,
    "vat" : 100000
}
```

### 4. Get Budget Task By GL Code

#### A. Endpoint

```Javascript
GET /ubudget/api/budget-task/:gl_code
```

#### B. Body, Params, and Query

##### Body

None

##### Params

| Field   | Type   | Required |
| ------- | ------ | :------: |
| gl_code | String |   Yes    |

##### Query

None

#### C. Request

```Javascript
GET /ubudget/api/budget-task/6120021
```
