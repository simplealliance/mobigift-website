const ENV = process.env.NODE_ENV;
const DEV_URL = "https://api-new.jsonone.com/api/v1";
const PROD_URL = "https://api-new.jsonone.com/api/v1";

const getServerUrl = () => {
    switch (ENV) {
        case "development":
            return DEV_URL;
        case "production":
            return PROD_URL;
    }
}

export const SERVER_URL = getServerUrl();