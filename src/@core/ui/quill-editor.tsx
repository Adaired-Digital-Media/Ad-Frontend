import ReactQuill, { type ReactQuillProps } from 'react-quill';
import { FieldError } from 'rizzui';
import { cn } from '../utils/class-names';
import 'react-quill/dist/quill.snow.css';
import { useMemo } from 'react';

interface QuillEditorProps extends ReactQuillProps {
  error?: string;
  label?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  toolbarPosition?: 'top' | 'bottom';
}

export default function QuillEditor({
  id,
  label,
  error,
  className,
  labelClassName,
  errorClassName,
  toolbarPosition = 'top',
  ...props
}: QuillEditorProps) {
  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ script: 'sub' }, { script: 'super' }],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],

        [{ indent: '-1' }, { indent: '+1' }, { align: [] }],

        [{ direction: 'rtl' }],
        ['link', 'image', 'video'],

        ['clean'],
      ],

      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      clipboard: {
        // Toggle to add extra line breaks when pasting HTML
        matchVisual: false,
      },
    }),
    []
  );

  // const quillFormats = [
  //   'header',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'strike',
  //   'list',
  //   'bullet',
  //   'blockquote',
  //   'code-block',
  //   'script',
  //   'indent',
  //   'color',
  //   'background',
  //   'font',
  //   'align',
  // ];

  return (
    <div className={cn(className)}>
      {label && (
        <label className={cn('mb-1.5 block', labelClassName)}>{label}</label>
      )}
      <ReactQuill
        modules={quillModules}
        // formats={quillFormats}
        className={cn(
          'react-quill',
          toolbarPosition === 'bottom' && 'react-quill-toolbar-bottom relative',
          className
        )}
        {...props}
      />
      {error && (
        <FieldError size="md" error={error} className={errorClassName} />
      )}
    </div>
  );
}
