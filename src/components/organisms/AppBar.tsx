import {
    Box,
    Container,
    Link,
    AppBar as MuiAppBar,
    Typography,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { styled } from '@mui/material/styles'

type AppBarProps = unknown

const Styled = {
    AppBar: styled(MuiAppBar)(({ theme }) => ({
        padding: theme.spacing(2, 0),
    })),
}

export const AppBar: React.FC<AppBarProps> = () => {
    return (
        <Styled.AppBar position="static">
            <Container maxWidth="xl">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h5" component="h1">
                        Investment Simulator
                    </Typography>

                    <Link
                        href="https://github.com/jorgejr568/investment-simulator"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Typography
                            variant="h6"
                            component="h1"
                            display="flex"
                            gap={1}
                            alignItems="center"
                            sx={(theme) => ({
                                color: theme.palette.primary.contrastText,
                            })}
                        >
                            <GitHubIcon />
                            GitHub
                        </Typography>
                    </Link>
                </Box>
            </Container>
        </Styled.AppBar>
    )
}
