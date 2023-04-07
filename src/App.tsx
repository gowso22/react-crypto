import React from 'react';
import Router from './routes/Router';
import { createGlobalStyle } from 'styled-components';
// devtools >> 캐시에 있는 query를 볼 수 있음
import {ReactQueryDevtools} from 'react-query/devtools'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Theme';
import {useRecoilValue} from 'recoil'
import { isDarkAtom } from './atoms';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height : 1.2;
}
a {
  text-decoration:none;
}
`;


function App() {
  // recoil 사용, 
  // useRecoilValue : state값을 읽을 수만 있게 하고 싶을 때에 추천하는 hook
  // useSetRecoilState : Recoil state의 값을 업데이트하기 위한 setter 함수를 반환합니다.
  //                     상태를 변경하기 위해 비동기로 사용될 수 있는 setter 함수를 리턴합니다.
  const isDark = useRecoilValue(isDarkAtom)

  return (
    <>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle/>
      <Router/>
      <ReactQueryDevtools initialIsOpen={true}/> 
    </ThemeProvider>
    </>
  );
}

export default App;
