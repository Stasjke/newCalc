import { useState } from 'react';
import styles from './App.module.css';

const Calculator = () => {
	const [operand1, setOperand1] = useState('');
	const [operator, setOperator] = useState('');
	const [operand2, setOperand2] = useState('');
	const [colorText, setColorText] = useState('#80c9c9');

	const displayValue = `${operand1} ${operator} ${operand2}`;

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

	const calcResult = () => {
		if (!operand1 || !operand2 || !operator) return operand1;

		const num1 = Number(operand1);
		const num2 = Number(operand2);

		if (isNaN(num1) || isNaN(num2)) return 'Error';

		let result;
		switch (operator) {
			case '+':
				result = num1 + num2;
				break;
			case '-':
				result = num1 - num2;
				break;
			default:
				return 'Error';
		}

		return result.toString();
	};

	const handleButtonClick = (value) => {
		setColorText('');

		switch (value) {
			case 'C':
				setOperand1('');
				setOperand2('');
				setOperator('');
				break;
			case '=':
				if (operand1 && operand2 && operator) {
					const result = calcResult();
					setOperand1(result);
					setOperand2('');
					setOperator('');
					setColorText('red');
				}
				break;
			case '+':
			case '-':
				if (operand1 && !operand2) {
					setOperator(value);
				} else if (operand1 && operand2) {
					const result = calcResult();
					setOperand1(result);
					setOperand2('');
					setOperator(value);
				} else if (!operand1) {
					setOperand1('0');
					setOperator(value);
				}
				break;
			default:
				if (!isNaN(Number(value))) {
					if (!operator) {
						setOperand1(operand1 + value);
					} else {
						setOperand2(operand2 + value);
					}
				}
				break;
		}
	};

	return (
		<div className={styles.Calculator}>
			<div className={styles.Display} style={{ color: colorText }}>
				{displayValue}
			</div>
			<div className={styles.Keypad}>
				{NUMS.map((button) => (
					<button
						key={button.id}
						className={styles.Button}
						onClick={() => button.value && handleButtonClick(button.value)}
						disabled={button.value === null}
					>
						{button.label}
					</button>
				))}
			</div>
		</div>
	);
};

export default Calculator;
