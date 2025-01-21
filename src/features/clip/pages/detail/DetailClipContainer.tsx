import DetailClipForm from '../../ui/forms/DetailClipForm';
import { useDetailClipForm } from '../../model/hooks/useDetailClipForm';

const DetailClipContainer = () => {
  const { handleBack, handleEdit } = useDetailClipForm();

  return <DetailClipForm handleBack={handleBack} handleEdit={handleEdit} />;
};
export default DetailClipContainer;
