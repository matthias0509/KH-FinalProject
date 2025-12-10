import { useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Header from '../components/Header';
import AppFooter from '../components/AppFooter';
import TextAlignExtension from '../utils/textAlignExtension';

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '50%',
        parseHTML: (element) => element.getAttribute('data-width') || '50%',
        renderHTML: (attributes) => {
          if (!attributes.width) return {};
          return {
            'data-width': attributes.width,
            style: `width: ${attributes.width};`,
          };
        },
      },
      align: {
        default: 'center',
        parseHTML: (element) => element.getAttribute('data-align') || 'center',
        renderHTML: (attributes) => ({ 'data-align': attributes.align || 'center' }),
      },
    };
  },
});

const emptyReward = { title: '', price: '', description: '', shipping: '' };

const STORY_GUIDE = `
<h1><strong>안녕하세요. 스토리 작성을 시작한 메이커님을 환영해요!</strong></h1>
<li>아래는 스토리를 쉽게 작성할 수 있도록 안내를 드리는 문구예요. 스토리를 어떻게 작성할지 고민이 된다면 참고해 보세요.</li>
<br>
<li>프로젝트 제출 이후, 푸딩은 메이커님 대신 스토리를 작성해 드리지 않아요. 메이커님의 이야기를 생생하게 담고, 진심을 그대로 전하기 위함이니 이해해 주세요.</li>
<br>
<li>이 문구는 메이커님께만 비밀리에 보여 드리는 내용이에요. 문구가 그대로 상세 페이지에 노출되면 서포터님들이 당황할 수 있으니 문구를 다 읽었다면, 꼭 삭제해 주세요.</li>
<br>
<h2><em>이제 스토리를 하나씩 작성해 볼까요? 나만의 문장을 채워 주세요.</em></h2>
`;

const BLOCK_OPTIONS = [
  { label: '본문', value: 'paragraph' },
  { label: '대제목 1', value: 'heading-1' },
  { label: '대제목 2', value: 'heading-2' },
  { label: '대제목 3', value: 'heading-3' },
  { label: '소제목', value: 'heading-4' },
];

export default function CreateProjectPage() {
  const storyImageInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    heroImage: '',
    heroImageName: '',
    storyHtml: STORY_GUIDE,
    openStart: '',
    openEnd: '',
    goal: '',
    rewards: [{ ...emptyReward }],
  });
  const [imageError, setImageError] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      CustomImage,
      TextAlignExtension.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: STORY_GUIDE,
    onUpdate({ editor: instance }) {
      setFormData((prev) => ({ ...prev, storyHtml: instance.getHTML() }));
    },
  });

  const editorReady = Boolean(editor);

  const activeBlock = (() => {
    if (!editor) return 'paragraph';
    if (editor.isActive('heading', { level: 1 })) return 'heading-1';
    if (editor.isActive('heading', { level: 2 })) return 'heading-2';
    if (editor.isActive('heading', { level: 3 })) return 'heading-3';
    if (editor.isActive('heading', { level: 4 })) return 'heading-4';
    return 'paragraph';
  })();

  const currentAlign = (() => {
    if (!editor) return 'left';
    if (editor.isActive('image')) {
      return editor.getAttributes('image').align || 'center';
    }
    const headingAlign = editor.getAttributes('heading').textAlign;
    const paragraphAlign = editor.getAttributes('paragraph').textAlign;
    return headingAlign || paragraphAlign || 'left';
  })();

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getCurrentImageCount = () => {
    let count = 0;
    editor?.state.doc.descendants((node) => {
      if (node.type.name === 'image') count += 1;
    });
    return count;
  };

  const handleInsertImage = () => {
    if (!editor) return;
    if (getCurrentImageCount() >= 10) {
      window.alert('이미지는 최대 10개까지만 삽입할 수 있습니다.');
      return;
    }
    const url = window.prompt('삽입할 이미지 URL을 입력하세요');
    if (!url) return;
    editor.chain().focus().setImage({ src: url, width: '50%', align: 'center' }).run();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImageError('이미지 파일을 선택해 주세요.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        heroImage: typeof reader.result === 'string' ? reader.result : '',
        heroImageName: file.name,
      }));
      setImageError('');
    };
    reader.onerror = () => {
      setImageError('이미지 로딩 중 오류가 발생했습니다. 다시 시도해 주세요.');
    };
    reader.readAsDataURL(file);
  };

  const handleStoryImageUpload = (event) => {
    if (!editor) return;
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const remainingSlots = Math.max(0, 10 - getCurrentImageCount());
    if (remainingSlots <= 0) {
      window.alert('이미지는 최대 10개까지만 추가할 수 있습니다.');
      if (storyImageInputRef.current) storyImageInputRef.current.value = '';
      return;
    }

    const limitedFiles = files.slice(0, remainingSlots);

    limitedFiles.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        window.alert(`${file.name}은(는) 이미지가 아닙니다.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          editor.chain().focus().setImage({ src: reader.result, alt: file.name, width: '50%', align: 'center' }).run();
        }
      };
      reader.readAsDataURL(file);
    });

    if (files.length > limitedFiles.length) {
      window.alert('선택한 이미지 중 일부는 제한으로 인해 추가되지 않았습니다. (최대 10개)');
    }

    if (storyImageInputRef.current) {
      storyImageInputRef.current.value = '';
    }
  };

  const triggerStoryImageUpload = () => {
    storyImageInputRef.current?.click();
  };

  const handleResizeImage = (width) => {
    if (!editor) return;
    if (!editor.isActive('image')) {
      window.alert('크기를 조절할 이미지를 먼저 선택해 주세요.');
      return;
    }
    const newWidth = width === 'auto' ? null : width;
    editor.chain().focus().updateAttributes('image', { width: newWidth || '100%' }).run();
  };

  const handleBlockChange = (event) => {
    if (!editor) return;
    const value = event.target.value;
    if (value === 'paragraph') {
      editor.chain().focus().setParagraph().run();
      return;
    }
    const level = Number(value.split('-')[1]);
    editor.chain().focus().setHeading({ level }).run();
  };

  const handleAlignment = (alignment) => {
    if (!editor) return;
    if (editor.isActive('image')) {
      editor.chain().focus().updateAttributes('image', { align: alignment }).run();
      return;
    }
    if (alignment === 'left') {
      editor.chain().focus().unsetTextAlign().run();
    } else {
      editor.chain().focus().setTextAlign(alignment).run();
    }
  };

  const updateReward = (index, key, value) => {
    setFormData((prev) => ({
      ...prev,
      rewards: prev.rewards.map((reward, rewardIndex) =>
        rewardIndex === index ? { ...reward, [key]: value } : reward,
      ),
    }));
  };

  const addReward = () => {
    setFormData((prev) => ({ ...prev, rewards: [...prev.rewards, { ...emptyReward }] }));
  };

  const removeReward = (index) => {
    setFormData((prev) => {
      if (prev.rewards.length === 1) return prev;
      return {
        ...prev,
        rewards: prev.rewards.filter((_, rewardIndex) => rewardIndex !== index),
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.heroImage) {
      setImageError('대표 이미지를 업로드해 주세요.');
      return;
    }

    const payload = {
      title: formData.title.trim(),
      heroImage: formData.heroImage,
      heroImageName: formData.heroImageName,
      storyHtml: editor?.getHTML() ?? '',
      openPeriod: {
        start: formData.openStart,
        end: formData.openEnd,
      },
      goal: Number(formData.goal) || 0,
      rewards: formData.rewards.map((reward) => ({
        ...reward,
        price: Number(reward.price) || 0,
      })),
    };

    console.log('제출 데이터', payload);
    alert('프로젝트 데이터가 준비되었습니다. 콘솔을 확인하세요.');
  };

  const handleSaveDraft = () => {
    alert('임시 저장 기능은 준비 중입니다. DB 연결 후 제공될 예정입니다.');
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content create-project">
        <div className="create-project__intro">
          <h1 className="section-title">프로젝트 올리기</h1>
          <p className="create-project__description">
            프로젝트 제목, 대표 썸네일(파일 업로드), Tiptap 리치 텍스트 스토리, 오픈 기간, 목표 금액,
            리워드를 입력하여 상세 페이지 데이터를 준비하세요. 업로드된 이미지는 브라우저에 임시 저장됩니다.
          </p>
        </div>

        <form className="create-project__form" onSubmit={handleSubmit}>
          <section className="create-project__section">
            <div className="create-project__section-header">
              <h2>기본 정보</h2>
              <p>프로젝트 카드와 상세 페이지 상단에 노출됩니다.</p>
            </div>
            <div className="form-group">
              <label htmlFor="project-title">프로젝트 제목</label>
              <input
                id="project-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={updateField}
                placeholder="프리미엄 수제 마카롱 정기구독"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="project-hero">대표 이미지 (썸네일)</label>
              <input
                id="project-hero"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={!formData.heroImage}
              />
              {formData.heroImage ? (
                <div className="image-preview">
                  <img src={formData.heroImage} alt="대표 이미지 미리보기" />
                  <span>{formData.heroImageName}</span>
                </div>
              ) : (
                <p className="form-help">썸네일로 사용할 이미지를 업로드하세요.</p>
              )}
              {imageError && <p className="form-help form-help--error">{imageError}</p>}
            </div>
          </section>

          <section className="create-project__section">
            <div className="create-project__section-header">
              <h2>프로젝트 스토리</h2>
              <p>문단 스타일, 정렬, 이미지 업로드 등 다양한 서식을 사용할 수 있어요.</p>
            </div>
            <div className="rich-editor">
              <div className="rich-editor__toolbar">
                <select value={activeBlock} onChange={handleBlockChange} disabled={!editorReady}>
                  {BLOCK_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="toolbar-divider" />
                <button type="button" disabled={!editorReady} onClick={() => editor?.chain().focus().toggleBold().run()}>
                  <strong>B</strong>
                </button>
                <button type="button" disabled={!editorReady} onClick={() => editor?.chain().focus().toggleItalic().run()}>
                  <em>I</em>
                </button>
                <button type="button" disabled={!editorReady} onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                  <u>U</u>
                </button>
                <div className="toolbar-divider" />
                <button type="button" disabled={!editorReady} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
                  • 목록
                </button>
                <button type="button" disabled={!editorReady} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
                  1. 목록
                </button>
                <button type="button" disabled={!editorReady} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
                  인용
                </button>
                <button type="button" disabled={!editorReady} onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
                  구분선
                </button>
                <div className="toolbar-divider" />
                <button
                  type="button"
                  disabled={!editorReady}
                  onClick={() => handleAlignment('left')}
                  className={currentAlign === 'left' ? 'is-active' : ''}
                >
                  좌
                </button>
                <button
                  type="button"
                  disabled={!editorReady}
                  onClick={() => handleAlignment('center')}
                  className={currentAlign === 'center' ? 'is-active' : ''}
                >
                  중
                </button>
                <button
                  type="button"
                  disabled={!editorReady}
                  onClick={() => handleAlignment('right')}
                  className={currentAlign === 'right' ? 'is-active' : ''}
                >
                  우
                </button>
                <div className="toolbar-divider" />
                <button type="button" disabled={!editorReady} onClick={handleInsertImage}>
                  이미지(URL)
                </button>
                <button type="button" disabled={!editorReady} onClick={triggerStoryImageUpload}>
                  이미지 업로드
                </button>
                <button type="button" disabled={!editorReady} onClick={() => handleResizeImage('50%')}>
                  이미지 50%
                </button>
                <button type="button" disabled={!editorReady} onClick={() => handleResizeImage('100%')}>
                  이미지 100%
                </button>
                <input
                  ref={storyImageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={handleStoryImageUpload}
                />
              </div>
              <EditorContent editor={editor} className="tiptap-editor" />
            </div>
          </section>

          <section className="create-project__section">
            <div className="create-project__section-header">
              <h2>오픈 기간 & 목표</h2>
              <p>상세 상단 진행 영역과 연결됩니다.</p>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="project-open-start">오픈 시작일</label>
                <input
                  id="project-open-start"
                  name="openStart"
                  type="date"
                  value={formData.openStart}
                  onChange={updateField}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="project-open-end">오픈 종료일</label>
                <input
                  id="project-open-end"
                  name="openEnd"
                  type="date"
                  value={formData.openEnd}
                  onChange={updateField}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="project-goal">달성 목표 금액 (원)</label>
                <input
                  id="project-goal"
                  name="goal"
                  type="number"
                  min="100000"
                  step="10000"
                  value={formData.goal}
                  onChange={updateField}
                  required
                />
              </div>
            </div>
          </section>

          <section className="create-project__section">
            <div className="create-project__section-header">
              <h2>리워드 구성</h2>
              <p>리워드 선택 영역에 표시될 옵션을 추가하세요.</p>
            </div>
            {formData.rewards.map((reward, index) => (
              <div key={`reward-${index}`} className="array-card">
                <div className="form-grid">
                  <div className="form-group">
                    <label>리워드명</label>
                    <input
                      type="text"
                      value={reward.title}
                      onChange={(event) => updateReward(index, 'title', event.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>금액 (원)</label>
                    <input
                      type="number"
                      min="1000"
                      step="500"
                      value={reward.price}
                      onChange={(event) => updateReward(index, 'price', event.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>설명</label>
                  <textarea
                    rows={2}
                    value={reward.description}
                    onChange={(event) => updateReward(index, 'description', event.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>배송 예정</label>
                  <input
                    type="text"
                    value={reward.shipping}
                    placeholder="예) 7월 1주차"
                    onChange={(event) => updateReward(index, 'shipping', event.target.value)}
                    required
                  />
                </div>
                <button
                  type="button"
                  className="array-card__remove"
                  onClick={() => removeReward(index)}
                >
                  리워드 삭제
                </button>
              </div>
            ))}
            <button type="button" className="array-field__add" onClick={addReward}>
              리워드 추가
            </button>
          </section>

          <div className="create-project__actions">
            <button type="button" className="header__cta create-project__submit" onClick={handleSaveDraft}>
              임시 저장
            </button>
            <button type="submit" className="header__cta create-project__submit">
              프로젝트 생성
            </button>
          </div>
        </form>
      </main>
      <AppFooter />
    </div>
  );
}
