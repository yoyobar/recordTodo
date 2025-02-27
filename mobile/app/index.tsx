import WebView from 'react-native-webview';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const Index = () => {
  return (
    <Container>
      <Header />
      <WebView
        style={styles.container}
        source={{ uri: 'https://recordtodo.yoyobar.xyz/' }}
        keyboardDisplayRequiresUserAction={false}
        automaticallyAdjustContentInsets={false}
      />
    </Container>
  );
};
export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  height: 55;
  background-color: #cad5e2;
  width: 100%;
`;
