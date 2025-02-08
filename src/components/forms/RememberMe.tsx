import { useRememberMe } from '@/hooks/auth/userRememberMe';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import { Box } from '@mui/material';
import styled from 'styled-components';

const RememberMe = () => {
  const { rememberMe, setRememberMe } = useRememberMe();

  return (
    <Container>
      <RememberCheckbox
        control={<Checkbox size="small" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
        label="Remember me"
      />
    </Container>
  );
};

export default RememberMe;

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const RememberCheckbox = styled(FormControlLabel)`
  color: ${(props) => props.theme.text.placeholder};
  line-height: 150%;
  letter-spacing: 0.15px;
  .MuiSvgIcon-root {
    color: ${(props) => props.theme.text.placeholder};
  }
  .MuiFormControlLabel-label {
    font-size: 12px;
    -webkit-user-select: none;
    user-select: none;
  }
`;
