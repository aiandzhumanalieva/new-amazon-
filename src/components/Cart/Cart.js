import React, { useContext } from 'react'
import { MainContext } from '../../context'
import styles from './Cart.module.scss'
import ContentLoader from 'react-content-loader'
const Cart = ({ title, price, imgUrl, onPlus }) => {
	const isLoading = useContext(MainContext)

	return (
		<>
			{/* {isLoading ? (
				<ContentLoader
					speed={2}
					width={400}
					height={460}
					viewBox='0 0 400 460'
					backgroundColor='#f3f3f3'
					foregroundColor='#efe6e6'
				>
					<rect x='-321' y='-66' rx='8' ry='8' width='606' height='549' />
				</ContentLoader>
			) : ( */}
			<div className={styles.cart__wrapper}>
				<div className={styles.cart__top}>
					<img src={imgUrl} alt='Cart Item' />
				</div>
				<div className={styles.cart__bottom}>
					<h3 className={styles.cart__title}>{title}</h3>
					<p className={styles.cart__price}>${price}</p>
					<button onClick={onPlus} className={styles.cart__add}>
						Add to Card
					</button>
				</div>
			</div>
			{/* )} */}
		</>
	)
}

export default Cart
