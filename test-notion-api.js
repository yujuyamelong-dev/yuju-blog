// Notion API 직접 테스트
const fs = require("fs");
const path = require("path");
const { Client } = require("@notionhq/client");

// .env.local 파일에서 환경 변수 로드
const envFilePath = path.join(__dirname, ".env.local");
if (fs.existsSync(envFilePath)) {
  const envContent = fs.readFileSync(envFilePath, "utf-8");
  envContent.split("\n").forEach((line) => {
    if (line && !line.startsWith("#")) {
      const [key, value] = line.split("=");
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    }
  });
}

const apiKey = process.env.NOTION_API_KEY;
const dbId = process.env.NOTION_DATABASE_ID;

console.log("API Key 설정됨:", !!apiKey);
console.log("DB ID 설정됨:", !!dbId);
console.log("DB ID:", dbId);

if (!apiKey || !dbId) {
  console.error("환경 변수 미설정");
  process.exit(1);
}

console.log("\n=== Client 객체 정보 ===");
console.log("Client 타입:", typeof Client);

const client = new Client({ auth: apiKey });

console.log("Client 속성:", Object.getOwnPropertyNames(client).filter(p => !p.startsWith('_')));
console.log("databases 존재?", !!client.databases);
console.log("databases 타입:", typeof client.databases);
console.log("databases 메서드:", Object.getOwnPropertyNames(client.databases || {}).filter(p => !p.startsWith('_')));

async function testQuery() {
  try {
    console.log("\n=== Notion API 테스트 시작 ===");
    console.log("데이터베이스 ID:", dbId);

    const response = await client.databases.query({
      database_id: dbId,
      page_size: 10,
    });

    console.log("\n✅ 쿼리 성공!");
    console.log("반환된 페이지 수:", response.results.length);

    if (response.results.length > 0) {
      console.log("\n첫 번째 페이지 정보:");
      const firstPage = response.results[0];
      console.log("- ID:", firstPage.id);
      console.log("- URL:", firstPage.url);
      if ("properties" in firstPage) {
        console.log("- 속성 개수:", Object.keys(firstPage.properties).length);
        console.log("- 속성명:", Object.keys(firstPage.properties).slice(0, 5));
      }
    }

    console.log("\n모든 페이지 상태:");
    response.results.forEach((page, index) => {
      if ("properties" in page && page.properties["Status"]) {
        const status = page.properties["Status"];
        console.log(`${index + 1}. Status:`, status.status?.name || "unknown");
      }
    });

  } catch (error) {
    console.error("❌ 에러 발생:");
    console.error("에러 타입:", error.constructor.name);
    console.error("에러 메시지:", error.message);
    console.error("에러 코드:", error.code);
    if (error.body) {
      console.error("에러 바디:", error.body);
    }
  }
}

testQuery();
