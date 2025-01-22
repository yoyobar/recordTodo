import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { todoView, userInformationLoad } from './lib/todoControl';
import { toast } from 'react-toastify';
import Loading from './components/Loading';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await userInformationLoad();
      await todoView();

      setIsAuthenticated(!!session); // 세션 존재 여부에 따라 상태 설정
      // setTimeout(() => {
      // }, 500);
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <>{children}</>; // 인증된 경우 컴포넌트 렌더링
  }

  toast.warn('잘못된 접근입니다.');
  return <Navigate to="/" replace />; // 인증되지 않은 경우 로그인 페이지로 리다이렉트
};

export default PrivateRoute;
