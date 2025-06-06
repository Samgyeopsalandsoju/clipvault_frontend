import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/shared/ui/shadcn';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IShareLinkBase } from '@/shared/data/types/share';
import { useRouter } from 'next/navigation';
import { usePresignedUrl, useToast } from '@/shared/core/hooks';
import { usePostShareLink } from '../hook/usePostShareLink';
import { prepareFileData } from '../model/util';
import { IClip } from '@/shared/data/types';
import { useS3 } from '@/shared/core/hooks/s3/useS3';
import { Copy } from 'lucide-react';
import { copyLink } from '@/shared/core/utils';
import { ExpiryDateSelector } from './ExpiryDateSelector';
import { Modal } from '@/shared/ui/modal/Modal';

export const ShareModal = ({ isOpen, onClose, list }: { isOpen: boolean; onClose: () => void; list: IClip[] }) => {
  const { register, handleSubmit, setValue, trigger, reset } = useForm<IShareLinkBase>();
  const router = useRouter();

  // state
  const [shareLink, setShareLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showingDue, setShowingDue] = useState<string>('7');
  // hook
  const { generatePutUrl } = usePresignedUrl();
  const { postShareLink } = usePostShareLink();
  const { upload } = useS3();

  const toast = useToast();

  const handleSelect = ({ days, showingDue }: { days: string; showingDue: string }): void => {
    setShowingDue(showingDue);
    setValue('due', days);
  };
  // onSubmit
  const onSubmit = async (data: IShareLinkBase) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // 먼저 데이터를 파일로 업로드 하기 위한 준비 단계
      const { blob, fileName, url } = prepareFileData({ list, title: data.title, due: data.due });
      const { body } = await postShareLink({ ...data, link: url });

      // 4001은 업로드 성공
      if (body === '4001') {
        const postToS3Url = await generatePutUrl({ fileName, fileType: blob.type });
        await upload({ file: blob, fileType: blob.type, url: postToS3Url });
        setShareLink(url);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error sharing link:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
        setShareLink('');
      }}
    >
      <Card className="w-[320px] md:w-[400px] shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.5)] transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create share link</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col pb-[26px] px-2 gap-5" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-xs md:text-base">
              {`The shared link will expire in ${showingDue} day${showingDue === '1' ? '' : 's'}. `}
              <br />
              Once expired, it will no longer be accessible.
            </p>
            {!!shareLink && (
              <>
                <div className="flex w-full gap-[10px]">
                  <input
                    className="flex w-full h-[40px] rounded-[8px] p-[10px] border-solid border-[1px] text-xs md:text-sm"
                    value={shareLink}
                    readOnly
                  />
                  <button
                    type="button"
                    className="border-solid border-[1px] rounded-[8px] p-[10px] active:scale-[0.97]"
                    onClick={(e) =>
                      copyLink(
                        e,
                        shareLink,
                        () => {
                          toast.success('링크가 복사되었습니다.');
                        },
                        () => {
                          toast.error('복사에 실패하였습니다.');
                        }
                      )
                    }
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </>
            )}
            {!shareLink && (
              <div className="flex flex-col gap-[0.7rem]">
                <Input
                  className="text-xs md:text-sm"
                  {...register('title', {
                    required: 'title is required',
                    maxLength: { value: 10, message: 'up to 10 letters' },
                    onChange: (e) => {
                      const value = e.target.value;
                      if (value.length > 10) {
                        e.target.value = value.slice(0, 10);
                      }
                    },
                  })}
                  onBlur={() => trigger('title')}
                  placeholder="Title"
                />
                <ExpiryDateSelector onSelect={handleSelect} />
              </div>
            )}
            <div className="flex gap-[15px]">
              <Button type="submit" className="px-8 text-xs md:text-sm">
                Create
              </Button>
              <Button
                type="button"
                className="flex flex-1 text-xs md:text-sm"
                onClick={() => router.push('/mypage/share')}
                variant="outline"
              >
                My Share Link
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Modal>
  );
};
