import { useState } from 'react';
import styles from './App.module.css';

const Calculator = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [displayValue, setDisplayValue] = useState('0');
	const [colorText, setColorText] = useState('#80c9c9');

	const createButton = (label, value, onClick, key) => {
		const buttonStyle = value === null ? { pointerEvents: 'none' } : {};
		return (
			<button
				className={styles.Button}
				onClick={onClick}
				data-value={value}
				key={key}
				style={buttonStyle}
			>
				{label}
			</button>
		);
	};

	const NUMS = [
		{ id: '001', label: 'C', value: 'C' },
		{ id: '002', label: '7', value: '7' },
		{ id: '003', label: '4', value: '4' },
		{ id: '004', label: '1', value: '1' },
		{ id: '005', label: '', value: null },
		{ id: '006', label: '+', value: '+' },
		{ id: '007', label: '8', value: '8' },
		{ id: '008', label: '5', value: '5' },
		{ id: '009', label: '2', value: '2' },
		{ id: '010', label: '0', value: '0' },
		{ id: '011', label: '-', value: '-' },
		{ id: '012', label: '9', value: '9' },
		{ id: '013', label: '6', value: '6' },
		{ id: '014', label: '3', value: '3' },
		{ id: '015', label: '=', value: '=' },
	];

	const handleNumberClick = (number) => {
		if (!operator) {
			setOperand1((prev) => prev + number);
			setDisplayValue((prev) => (prev === '0' ? number : prev + number));
			setColorText('');
		} else {
			setColorText('');
			setOperand2((prev) => prev + number);
			setDisplayValue((prev) => {
				if (prev.includes(operator)) {
					return prev + number;
				}
				return prev + operator + number;
			});
		}
	};

	const calcResult = () => {
		if (!operand1 || !operand2 || !operator) return;

		let result;
		const n1 = Number(operand1);
		const n2 = Number(operand2);

		if (operator === '+') {
			result = n1 + n2;
		} else if (operator === '-') {
			result = n1 - n2;
		}

		setDisplayValue(result.toString());
		setOperand1(result.toString());
		setOperand2('');
		setOperator('');
		setColorText('');
	};

	const handleOperatorClick = (oper) => {
		if (oper === 'C') {
			setOperand1('');
			setOperand2('');
			setOperator('');
			setDisplayValue('0');
			setColorText('');
		} else {
			setOperator(oper);
			setColorText('');
			setDisplayValue((prev) => {
				return prev + oper;
			});
		}
	};

	const handleEqualClick = () => {
		calcResult();
		setColorText('red');
	};

	return (
		<div className={styles.Calculator}>
			<div className={styles.Display} style={{ color: colorText }}>
				{displayValue}
			</div>
			<div className={styles.Keypad}>
				{NUMS.map((button) => {
					return createButton(
						button.label,
						button.value,
						button.value === '='
							? handleEqualClick
							: button.value === 'C'
							? () => handleOperatorClick(button.value)
							: button.value === '+' || button.value === '-'
							? () => handleOperatorClick(button.value)
							: () => handleNumberClick(button.value),
						button.id,
					);
				})}
			</div>
		</div>
	);
};

export default Calculator;
