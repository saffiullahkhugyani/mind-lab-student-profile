interface Props {
  children: string;
  className: string;
  onClick: () => void;
}

const Button = ({ children, className, onClick }: Props) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
