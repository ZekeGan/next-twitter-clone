# Twitter Clone 介紹

# 使用技術
- Nextjs 13: 框架我選擇 Nextjs，他提供的 SSR 和 SSG 對 SEO 更友好，對頁面載入也快，對用戶的隱私更能起到作用
- Tailwind: CSS框架方面 我選擇Tailwind，因為它能夠更快速的定義CSS，而且他的高度自訂性讓我更能客製化的創建UI元件
- Next-auth: 提供了廣泛的第三方登入選項，能夠更快速和簡單的集成
- Typescript: 讓我在編寫網頁時能夠及時回報錯誤，降低專案上線時的 Bug 機率
- MongoDB: 資料庫我選擇了 MongoDB，因為它提供了線上的資料庫管理Atlas，和雲端的資料庫儲存服務 
- Prisma: 資料庫串接方面，Prisma 提供了更簡單的方式讓我管理和操作資料庫

# 架構設計

## 目錄結構
我根據不同職責來區分不同資料夾
+ src/
  + actions   : 使用 prisma cllient 從資料庫 GET 資料的函式
  + app       : 主要畫面的路由和 API
  + component : 可重複利用的 UI 組件
  + libs      : 第三方套件庫
  + hooks     : React Hook 資料夾
  + context   : 需要放在最上層的 context 組件
  + styles    : 全局 CSS 

```
twitter-clone/
  ├── prisma/              # 存放 Prisma 資料庫模型定義
  ├── public/              # 存放靜態資源，如圖片
  ├── src/                 
  │  ├── app/              
  │  │  ├── (site)/        # 網頁路由頁面
  │  │  └── api/           # API POST PUT 等 API 
  │  ├── actions           # API Get 函式
  │  ├── components/       # 可重用的 React 元件
  │  ├── context/          # React context 的元件
  │  ├── hooks/            # React hooks
  │  ├── libs/             # 第三方套件
  │  ├── styles/           # 存放全域性 CSS 樣式和 Tailwind 的配置
  │  └── middleware.ts     # next-auth 的 middleware，配置受保護的路由
  ├── .env                 # 環境變數
  ├── next.config.js       # Next.js 的配置
  └── ...                  # 其他專案文件和配置
```

## 路由設計
我主要根據頁面不同的類型來設計，由四大區塊 Auth, Home, Notification, user來區分不同功能頁面

而同一頁面不同資料，像是user頁面，首先利用動態路由 `[id]` 來獲得該 params，再由 params從資料庫取得相對應用戶的資料，再呈現在頁面上

Twitter 有許多 Tabs 頁面，在Tabs切換我也是利用動態路由來達成。首先在路由上獲取 params 把獲得的關鍵字來對應不同的 action，獲得當前頁面的資料，和params 會傳入 `useRoutes` 類的 hook 返回該路由，畫面再重新渲染呈現在用戶眼前

```
  ├── src/                 
  │  ├── app/              
  │  │  ├── (site)/          
  │  │  │  ├── auth/                 # 登入頁面
  │  │  │  ├── home/                 # 首頁 
  │  │  │  │  └── [slug]             # 獲取首頁的 Tabs 類型 
  │  │  │  ├── notification/         # 通知頁面
  │  │  │  └── user/                 # 個人資訊頁面
  │  │  │        └── [userid]        # 用戶的專屬 ID
  │  │  │           ├──[slug]        # 獲取個人資訊的 Tabs 類型
  │  │  │           ├── follow 
  │  │  │           │  └── [tabType] # 獲取用戶的追蹤和被追蹤者 Tabs 類型
  │  │  │           └── status 
  │  │  │              └── [tweetId] # 單一推文 ID
  │  │  └── api/           
  │
```


## 資料庫設計
我使用 Prisma 定義了資料庫的模型，位置在 `./prisma/schema.prisma`。主要由四大 collection 組成，User, Tweet, Account, Notification

### 彼此的關聯
+ 追蹤User: User 可以追隨多名 User，也可以被多名 User 追蹤，所以是自身多對多
```prisma
model User {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId

  followBy     User[]   @relation("Follow", fields: [followByIds], references: [id])
  followByIds  String[] @db.ObjectId
  following    User[]   @relation("Follow", fields: [followingIds], references: [id])
  followingIds String[] @db.ObjectId
}
```

+ 推文: User 可以發文可以有多則 Tweet，但是一則 Tweet 只能有一個作者，是一對多的關係
```prisma
model User {
  id     String  @id @default(auto()) @map("_id") @db.ObjectId
  tweets Tweet[] @relation("UserPosts")
}

model Tweet {
  id       String   @id @default(auto()) @map("_id") @db.ObjectId
  content  String?
  author   User     @relation("UserPosts", fields: [authorId], references: [id])
  authorId String   @db.ObjectId
}
```

+ 轉推和喜歡的推文: User 可以喜歡和轉推多則Tweet，Tweet 也可以被多名 User 喜歡和轉推，所以是多對多
```prisma
model User {
  id                String  @id @default(auto()) @map("_id") @db.ObjectId
  likeTweets       Tweet[]  @relation("LikeTweets", fields: [likeTweetsIds], references: [id])
  likeTweetsIds    String[] @db.ObjectId
  retweetTweets    Tweet[]  @relation("Retweet", fields: [retweetTweetsIds], references: [id])
  retweetTweetsIds String[] @db.ObjectId
}

model Tweet {
  id             String   @id @default(auto()) @map("_id") @db.ObjectId
  likeFrom       User[]   @relation("LikeTweets", fields: [likeFromIds], references: [id])
  likeFromIds    String[] @db.ObjectId
  retweetFrom    User[]   @relation("Retweet", fields: [retweetFromIds], references: [id])
  retweetFromIds String[] @db.ObjectId
}
```


+ 留言: 推文可以被留言，該留言也可以被留言，所以可以把一則留言視為一個Tweet。留言只可以回覆一則推文，但是一則推文可以擁有多則留言，所以是 Tweet 的自身一對多
```prisma
model Tweet {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  content      String?
  comments     Tweet[]  @relation("Comments")
  responseFrom Tweet?   @relation("Comments", fields: [responseId], references: [id], onDelete: NoAction, onUpdate: NoAction)
  responseId   String?  @db.ObjectId
}
```

+ 通知　　　　: 一個 User 可以擁有多則通知，一個通知可以傳給多個 User，所以是多對多。
+ 通知的內容　: 根據通知的類型也許需要關聯一個 Tweet (假設某使用者發出了新的推文，需要通知其追蹤者)，所以是一對一
+ 發出通知　　: 發出推文的人只能有一個，而一個人可以發出很多通知，所以是一對多
```prisma
model User {
  id             String    @id @default(auto()) @map("_id") @db.ObjectId

  notificationsAuthor Notification[] @relation("author")

  notifications   Notification[] @relation("notices", fields: [notificationsId], references: [id])
  notificationsId String[]       @db.ObjectId
}

model Tweet {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  content      String?
  notification Notification?
}

model Notification {
  id        String           @id @default(auto()) @map("_id") @db.ObjectId

  content   Tweet?  @relation(fields: [contentId], references: [id])
  contentId String? @unique @db.ObjectId

  from   User   @relation("author", fields: [fromId], references: [id])
  fromId String @db.ObjectId

  to    User[]   @relation("notices", fields: [toIds], references: [id])
  toIds String[] @db.ObjectId
}
```

## 第三方服務的整合

### MongoDB / Atlas
我選擇 MongoDB 是由於它提供了雲端的資料儲存，還有管理資料庫的系統 Altas，這讓我很方便的搭建我的系統而不需要考慮資料庫建構 

### Prisma
由於我對資料庫方面的理解甚少，而 Prisma 提供了簡易的資料庫 CRUD 功能，讓對 SQL 語法不太熟悉的我提供了快速的查找和搜尋。而 schema.prisma 讓之後開發時更能快速的回顧資料庫的結構 

### NextAuth
我使用了Next-auth 來使用第三方的登入系統。由於他提供許多的 Provider，也可以自定義帳號密碼輸入的選項，另外也提供了登入的快取儲存，相當方便
我把相關配置文件存放在 `/src/app/api/auth/[...nextauth]/route.ts`，用來處理不同的登入驗證邏輯

### Tailwind CSS
我選擇 Tailwind 是因為它的原子化設計能更簡單且更直觀的使用，加速了開發的效率和速度。另外 Next 也很好的支援了 Tailwind

### headless UI
由於某些 Component 的顯示和關閉，我需要個能過渡中間動畫的原件。headless UI 提供了簡單配置 CSS 動畫的組件，而且他也很好的支援了 Tailwind，這使我選擇了它

### Axios
前端中最常見的 HTTP 請求工具，使用簡單也相當輕量

### bcrypt
在註冊和登入時需要把密碼給加密，避免在傳輸過程被駭入，就算被害入也能避免密碼被破解。bcrtpt提供簡單的使用和配置，這讓我很簡單的就能使用

### clsx
更方便的編輯 `className` 的 Library，配合上 Tailwind 更能有奇效，在 `className` 中進行條件判斷時候經常會使用到

### date-fns
方便的自定義格式化的時間戳資料




# 解決的挑戰
在剛開始使用 Next-auth 時候，我根據官方文檔一步一步配置設定。配置完成後啟動卻沒有效果，在一開始我以為是我哪裡配置錯誤了，於是又一步一步查看我的代碼和官方代碼的差別，但是都沒錯

我 google 了 terminal 的錯誤資訊，但是也查不出個所以然。當我再次查看時，我發現上面出現了關鍵字 `prisma`。由於我是利用 prisma 來串接我的資料庫，官方也有提供 Prisma 的 Adapter，我猜想是否是這裡出現了問題

把網上能查的資料給查了個遍，但是卻沒有什麼效果。於是我開始在 youtube 上找找有沒有人跟我一樣使用 next-auth, prisma，我找到了某個教學頻道，他也是用以上的技術，我查看他的原始碼，發現他的原始碼有個地方和我不同---schema.prisma的Modal，他多寫了`Modal Account`，我也照他的寫法寫了一遍...。當前的錯誤消失了，卻又多出了幾個沒見過的錯誤。
Bingo，這代表是我資料庫的架構有問題，之後我根據錯誤訊息把相對應的資料進行修改，並且把這問題解決了

# 結論 
