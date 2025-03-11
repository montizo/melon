import { useCallback, useState } from "react";
import {
  Slate,
  Editable,
  withReact,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import {
  Descendant,
  Editor,
  Element as SlateElement,
  BaseEditor,
  createEditor,
  Transforms,
} from "slate";
import { ReactEditor } from "slate-react";

type CustomElement = {
  type: "paragraph" | "code" | null;
  children: CustomText[];
};
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};
type CustomEditorType = Editor & ReactEditor;

const CustomEditor = {
  isBoldMarkActive(editor: CustomEditorType) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isItalicMarkActive(editor: CustomEditorType) {
    const marks = Editor.marks(editor);
    return marks ? marks.italic === true : false;
  },

  isUnderlineMarkActive(editor: CustomEditorType) {
    const marks = Editor.marks(editor);
    return marks ? marks.underline === true : false;
  },

  isCodeBlockActive(editor: CustomEditorType) {
    const [match] = Editor.nodes(editor, {
      match: (n) => SlateElement.isElement(n) && n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor: CustomEditorType) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleItalicMark(editor: CustomEditorType) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },

  toggleUnderlineMark(editor: CustomEditorType) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
  },

  toggleCodeBlock(editor: CustomEditorType) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export default function TextBox({
  label,
  type,
  name,
  placeholder,
  value = "",
  onChange,
}: {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;

          switch (event.key) {
            case "`":
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            case "b":
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            case "i":
              event.preventDefault();
              CustomEditor.toggleItalicMark(editor);
              break;
            case "u":
              event.preventDefault();
              CustomEditor.toggleUnderlineMark(editor);
              break;
          }
        }}
      />
    </Slate>
  );
}

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const Leaf = (props: any) => {
  let style: React.CSSProperties = {};

  if (props.leaf.bold) {
    style.fontWeight = "bold";
  }
  if (props.leaf.italic) {
    style.fontStyle = "italic";
  }
  if (props.leaf.underline) {
    style.textDecoration = "underline";
  }

  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};
