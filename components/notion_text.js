
import styles from '../styles/blog_detail.module.css';
import Latex from 'react-latex-next'


export default function Text({ title }) {
  if (!title) {
    return null;
  }
  return title.map((value) => {
    const {
      annotations: {
        bold, code, color, italic, strikethrough, underline,
      },
      text,
      equation,
    } = value;
    if (text) {
      return (
        <span
            className={[
            bold ? styles.bold : '',
            code ? styles.code : '',
            italic ? styles.italic : '',
            strikethrough ? styles.strikethrough : '',
            underline ? styles.underline : '',
            ].join(' ')}
            style={color !== 'default' ? { color } : {}}
            key={text.content}
        >
            {text.link ? <a href={text.link.url}>{text.content}</a> : text.content}
        </span>
      );
    } 
    
    else {
      return (
        <span
            className={[
            bold ? styles.bold : '',
            code ? styles.code : '',
            italic ? styles.italic : '',
            strikethrough ? styles.strikethrough : '',
            underline ? styles.underline : '',
            ].join(' ')}
            style={color !== 'default' ? { color } : {}}
            key={equation.expression}
        >
        {equation.expression}
        </span>
    );
    }
    
  });
}