// import original module declarations
import "styled-components";

// and extend theme!
declare module "styled-components" {
export interface DefaultTheme {
// 테마 설정 부분

textColor: string;
bgColor: string;
accentColor: string;
cardBgColor: string;
    }   
}
